/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoStream from '../components/VideoStream';
import useRTCVideoCall from '../hooks/useRTCVideoCall';

interface VideoMeetingProps {}

const VideoMeeting: React.FC<VideoMeetingProps> = () => {
  const { code } = useParams();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const meeting = useRTCVideoCall();

  async function initCall() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    await meeting.join(stream, code as string);
  }

  useEffect(() => {
    initCall();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3">
        {!!localStream && (
          <div className={'flex-1'}>
            <VideoStream className={'w-full'} stream={localStream} />
          </div>
        )}
        {meeting.users.map((user, index) => (
          <div className={'flex-1'} key={index}>
            {!!user.peer && (
              <VideoStream className={'w-full'} peer={user.peer} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoMeeting;
