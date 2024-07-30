import React, { useEffect, useRef, useState } from 'react';
import styles from './VoiceCall.module.css';

interface VoiceCallProps {
  contact: any;
  onClose: () => void;
  userId: string; // Add the userId prop for authentication
}

const VoiceCall: React.FC<VoiceCallProps> = ({ contact, onClose, userId }) => {
  const ws = useRef<WebSocket | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [callStatus, setCallStatus] = useState<'connecting' | 'inCall' | 'callEnded'>('connecting');

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8081');

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'register', userId }));
    };

    ws.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      handleSignalingData(message);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [userId]);

  const handleSignalingData = async (data: any) => {
    if (!data || !data.type) return;

    switch (data.type) {
      case 'incoming_call':
        setCallStatus('connecting');
        await peerConnection?.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection?.createAnswer();
        await peerConnection?.setLocalDescription(answer);
        ws.current?.send(JSON.stringify({ type: 'answer', targetId: data.from, answer }));
        break;
      case 'call_answer':
        await peerConnection?.setRemoteDescription(new RTCSessionDescription(data.answer));
        setCallStatus('inCall');
        break;
      case 'candidate':
        if (peerConnection) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
      default:
        console.error('Unknown signaling data type:', data.type);
        break;
    }
  };

  useEffect(() => {
    const initiateCall = async () => {
      const pc = new RTCPeerConnection(configuration);
      setPeerConnection(pc);

      localStream.current = await getUserMedia();
      localStream.current?.getTracks().forEach((track) => pc.addTrack(track, localStream.current as MediaStream));

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteStream.current = event.streams[0];
          remoteVideoRef.current.srcObject = remoteStream.current;
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          ws.current?.send(JSON.stringify({ type: 'candidate', targetId: contact.id, candidate: event.candidate }));
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      ws.current?.send(JSON.stringify({ type: 'call', targetId: contact.id, offer }));
    };

    if (callStatus === 'connecting' && ws.current?.readyState === WebSocket.OPEN) {
      initiateCall();
    }
  }, [callStatus, contact.id]);

  const handleEndCall = () => {
    peerConnection?.close();
    setPeerConnection(null);

    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;

    setCallStatus('callEnded');
    onClose();
  };

  return (
    <div className={styles.voiceCallContainer}>
      <h2>
        {callStatus === 'connecting' ? 'Connecting...' : `Calling ${contact.name}`}
      </h2>
      <video ref={localVideoRef} autoPlay muted className={styles.video} />
      <video ref={remoteVideoRef} autoPlay className={styles.video} />
      {callStatus !== 'callEnded' && (
        <button className={styles.endButton} onClick={handleEndCall}>
          End Call
        </button>
      )}
    </div>
  );
};

export default VoiceCall;

async function getUserMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return stream;
  } catch (error) {
    console.error('Error accessing media devices.', error);
    throw error;
  }
}

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};
