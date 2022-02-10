export interface VideoCallSession {
  id: string;
  sdp: string;
  type: 'answer' | 'offer';
}
