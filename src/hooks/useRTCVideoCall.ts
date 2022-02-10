import Pusher from 'pusher-js';
import { useRef, useState } from 'react';
import Peer from 'simple-peer';

const pusher = new Pusher('b37768c33e403e78f73a', {
  cluster: 'us2',
  authEndpoint:
    'https://network-sports-league-manager.vercel.app/api/auth-pusher',
  forceTLS: true,
});

interface PeerUser {
  userId: string;
  peer: Peer.Instance;
}

export default function useRTCVideoCall() {
  const currentUserIdRef = useRef('');
  const peersRef = useRef<PeerUser[]>([]);
  const [users, setUsers] = useState<PeerUser[]>([]);

  function addUser(userId: string, peer: Peer.Instance) {
    setUsers((users) => {
      let newUsers = [...users, { userId, peer }];
      peersRef.current.push({ userId, peer });
      return newUsers;
    });
  }

  async function join(localStream: MediaStream, callId: string) {
    const channel = pusher.subscribe(`presence-meeting-${callId}`);
    channel.bind('pusher:subscription_succeeded', (data: any) => {
      const members = Object.keys(data.members).filter(
        (userId) => userId !== data.myID
      );
      currentUserIdRef.current = data.myID;

      members.forEach((userId) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: localStream,
        });

        peersRef.current.push({ userId, peer });

        peer.on('signal', (signal) => {
          channel.trigger('client-joined', {
            to: userId,
            from: currentUserIdRef.current,
            signal,
          });
        });
      });
      setUsers([...peersRef.current]);
    });

    channel.bind('client-joined', ({ to, from, signal }: any) => {
      if (peersRef.current.some((u) => u.userId === to)) return;

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: localStream,
      });

      peer.on('signal', (signal) => {
        channel.trigger('client-return-signal', {
          to: from,
          from: to,
          signal,
        });
      });

      peer.signal(signal);

      addUser(from, peer);
    });

    channel.bind('client-return-signal', ({ from, signal }: any) => {
      const user = peersRef.current.find((u) => u.userId === from);
      if (!user || !user.peer) return;
      user.peer.signal(signal);
    });

    channel.bind('pusher:member_removed', (data: any) => {
      const userId = data.id;
      setUsers((users) => [...users.filter((user) => user.userId !== userId)]);
      const user = peersRef.current.find((user) => user.userId === userId);
      user?.peer.destroy();
    });
  }

  return { join, users, sessionId: currentUserIdRef.current };
}
