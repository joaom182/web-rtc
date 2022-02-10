import React, { useEffect, useRef } from 'react';
import Peer from 'simple-peer';

export interface VideoStreamProps {
  stream?: MediaStream;
  peer?: Peer.Instance;
  className?: string;
}

const VideoStream: React.FC<VideoStreamProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  function setVideoStream(stream: MediaStream) {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
  }

  useEffect(() => {
    if (!videoRef.current) return;

    if (props.stream) {
      setVideoStream(props.stream);
    }

    if (props.peer) {
      props.peer.on('stream', setVideoStream);
    }
  }, [props.stream, props.peer]);

  return (
    <video
      className={props.className}
      ref={videoRef}
      autoPlay
      playsInline
      muted
    />
  );
};

export default VideoStream;
