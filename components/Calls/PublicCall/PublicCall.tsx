import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from './PublicCall.module.css';
import { FaPhoneSlash, FaPlus, FaUserPlus, FaComment, FaSmile } from 'react-icons/fa';
import axios from 'axios';
import ChatWindow from '../../Chats/ChatWindow/ChatWindow';

interface PublicCallProps {
  callId: string;
}

const PublicCall: React.FC<PublicCallProps> = ({ callId }) => {
  const { data: sessionData, status } = useSession();
  const userId = sessionData?.user?.id || 1;
  const currentUser = {
    id: userId,
    name: sessionData?.user?.name || "Current User",
  };
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [existingUsers, setExistingUsers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const peersRef = useRef<any[]>([]);
  const iceCandidateQueue = useRef<{ [key: string]: RTCIceCandidate[] }>({});
  const router = useRouter();

  useEffect(() => {
    const initStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    initStream();

    const handleBeforeUnload = () => {
      endCall();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowChat(false);
        setShowUserSelect(false);
        setShowMenu(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
      endCall();
    };
  }, []);

  useEffect(() => {
    if (stream) {
      ws.current = new WebSocket('ws://localhost:8081');
      
      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
        ws.current?.send(JSON.stringify({ type: 'join_public_call', userId: userId, callId }));
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'new_peer':
            handleNewPeer(message.peerId, message.createOffer);
            break;
          case 'offer':
            handleOffer(message.offer, message.peerId);
            break;
          case 'answer':
            handleAnswer(message.answer, message.peerId);
            break;
          // case 'candidate':
          //   handleCandidate(message.candidate, message.peerId);
          //   break;
          default:
            break;
        }
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
    }
  }, [stream]);

  const handleNewPeer = async (peerId: string, createOffer: boolean) => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        ws.current?.send(JSON.stringify({ type: 'candidate', target: peerId, candidate: event.candidate }));
      }
    };
    peerConnection.ontrack = (event) => {
      setPeers((prevPeers) => [...prevPeers, { id: peerId, stream: event.streams[0] }]);
    };
    stream?.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    peersRef.current.push({ id: peerId, peerConnection });

    iceCandidateQueue.current[peerId] = [];

    if (createOffer) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      ws.current?.send(JSON.stringify({ type: 'offer', target: peerId, offer }));
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit, peerId: string) => {
    const peerConnection = peersRef.current.find((peer) => peer.id === peerId)?.peerConnection;
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      ws.current?.send(JSON.stringify({ type: 'answer', target: peerId, answer }));

      // Process any queued candidates
      if (iceCandidateQueue.current[peerId]) {
        while (iceCandidateQueue.current[peerId].length) {
          const candidate = iceCandidateQueue.current[peerId].shift();
          if (candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      }
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit, peerId: string) => {
    const peerConnection = peersRef.current.find((peer) => peer.id === peerId)?.peerConnection;
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

      // Process any queued candidates
      if (iceCandidateQueue.current[peerId]) {
        while (iceCandidateQueue.current[peerId].length) {
          const candidate = iceCandidateQueue.current[peerId].shift();
          if (candidate) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      }
    }
  };

  // const handleCandidate = async (candidate: RTCIceCandidateInit, peerId: string) => {
  //   const peerConnection = peersRef.current.find((peer) => peer.id === peerId)?.peerConnection;
  //   if (peerConnection) {
  //     if (peerConnection.remoteDescription) {
  //       await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  //     } else {
  //       iceCandidateQueue.current[peerId].push(candidate);
  //     }
  //   }
  // };

  const endCall = async () => {
    ws.current?.close();
    peersRef.current.forEach((peer) => peer.peerConnection.close());
    stream?.getTracks().forEach((track) => track.stop());
    setPeers([]);
    setStream(null);

    try {
      await axios.put("http://localhost:5500/public-calls", {
        host_user_id: userId,
        call_id: callId,
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving call data:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowChat(false);
    setShowUserSelect(false);
  };

  const handleAddUser = () => {
    setShowUserSelect((prev) => !prev);
  };

  const handleAddChatMessage = () => {
    setShowChat((prev) => !prev);
  };

  const handleReact = (emoji: string) => {
    setReaction(emoji);
    setTimeout(() => {
      setReaction(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchExistingUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/users", {
          params: { filter, limit: 10, offset: page * 10 },
        });
        setExistingUsers(response.data);
      } catch (error) {
        console.error("Error fetching existing users:", error);
      }
    };

    fetchExistingUsers();
  }, [filter, page]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  return (
    <div className={styles.publicCallContainer}>
      <video ref={localVideoRef} autoPlay muted className={styles.localVideo} />
      <div className={styles.peersContainer}>
        {peers.map((peer) => (
          <RemoteVideo key={peer.id} stream={peer.stream} />
        ))}
      </div>
      <button onClick={endCall} className={styles.endCallButton}>
        <FaPhoneSlash />
      </button>
      <div className={styles.fabContainer}>
        <button onClick={toggleMenu} className={styles.fabButton}>
          <FaPlus />
        </button>
        {showMenu && (
          <div className={styles.menu}>
            <button onClick={handleAddUser} className={styles.menuButton}>
              <FaUserPlus />
            </button>
            <button onClick={handleAddChatMessage} className={styles.menuButton}>
              <FaComment />
            </button>
            <button onClick={() => handleReact("👍")} className={styles.menuButton}>
              <FaSmile />
            </button>
          </div>
        )}
      </div>
      {reaction && (
        <div className={styles.reaction}>
          <span>{reaction}</span>
        </div>
      )}
      {showChat && <ChatWindow chatId="public-call-chat" query='' type='' onThread={() => {}}/>}
      {showUserSelect && (
        <div className={styles.existingUserSection}>
          <label>
            Existing User:
            <input
              type="text"
              placeholder="Search users..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.input}
            />
            <select name="selectedUser" value={selectedUserId} onChange={handleUserChange} className={styles.selectBox}>
              <option value="">Select an existing user</option>
              {existingUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} ({user.email})
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button type="button" onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

const RemoteVideo: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay className={styles.remoteVideo} />;
};

export default PublicCall;
