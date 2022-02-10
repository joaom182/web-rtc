export function pushStreamToPeerConnection(
  peerConnection: RTCPeerConnection,
  stream: MediaStream
) {
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
}

export function pullStreamsFromPeerConnection(
  peerConnection: RTCPeerConnection,
  callback: (streams: readonly MediaStream[]) => void
) {
  peerConnection.ontrack = (event) => {
    callback && callback(event.streams);
  };
}

export async function createOffer(
  peerConnection: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> {
  const offerDescription = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offerDescription);
  return offerDescription;
}

export async function createAnswer(
  peerConnection: RTCPeerConnection
): Promise<RTCSessionDescriptionInit> {
  const answerDescription = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answerDescription);
  return answerDescription;
}
