import React, { useState, useEffect } from "react";
import { FaTimes, FaMicrophone, FaStop } from "react-icons/fa";
import { startRecording } from "../../../utils/audioRecorder";
import styles from "./VoiceModal.module.css";

interface VoiceModalProps {
  onClose: () => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({ onClose }) => {
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [command, setCommand] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (mediaBlobUrl && audioBlob) {
      const audioElement = document.getElementById("audio") as HTMLAudioElement;
      audioElement.src = mediaBlobUrl;
      audioElement.onloadedmetadata = () => {
        if (audioElement.duration !== Infinity) {
          setDuration(audioElement.duration);
        } else {
          audioElement.addEventListener(
            "durationchange",
            () => {
              setDuration(audioElement.duration);
            },
            { once: true }
          );
        }
      };
    }
  }, [mediaBlobUrl, audioBlob]);

  const handleStartRecording = async () => {
    const recorder = await startRecording(setMediaBlobUrl, setAudioBlob);
    setRecording(recorder);
  };

  const handleStopRecording = async () => {
    if (recording) {
      recording.stop();
      recording.stream.getTracks().forEach((track) => track.stop());
      setRecording(null);

      if (audioBlob) {
        await transcribeAudio();
      }
    }
  };

  const transcribeAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/transcribe`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error transcribing audio:", errorData.error);
          return;
        }

        const data = await response.json();
        setTranscription(data.transcription);
        console.log(data)
        setCommand(data.command);

        // Optionally, you can retrieve and play the cached audio from Redis
        const audioResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/audio/${data.audio_key}`
        );
        if (audioResponse.ok) {
          const audioBlob = await audioResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          setMediaBlobUrl(audioUrl);
        }
      } catch (error) {
        console.error("Error transcribing audio:", error);
      } finally {
        setAudioBlob(null); // Clean up the audio Blob
      }
    }
  };

  const executeCommand = () => {
    if (command) {
      setRunning(true);
      let dots = 0;
      const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        // setCommand((prevCommand) => {
        //   const safePrevCommand = prevCommand ?? "";
        //   `${safePrevCommand.split("...")[0]}${".".repeat(dots)}`;
        // });
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setRunning(false);
        // Here you can add the actual execution logic for each command
        console.log("Executing command:", command);
        // For example:
        if (command.includes("specific page")) {
          window.location.href = "/specific-page";
        } else if (command.includes("contact")) {
          // Call contact logic
        } else if (command.includes("chat")) {
          // Start chat logic
        } else if (command.includes("calendar event")) {
          // Set calendar event logic
        } else {
          console.log("Unknown command");
        }
      }, 2000);
    }
  };

  const handleExecuteCommandClick = () => {
    if (command) {
      executeCommand();
    }
  };

  const handleCloseModal = () => {
    setRecording(null);
    setMediaBlobUrl(null);
    setAudioBlob(null);
    setTranscription(null);
    setDuration(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <FaTimes className={styles.closeButton} onClick={handleCloseModal} />
        <h2>Voice Command</h2>
        <div className={styles.waveContainer}>
          {recording && <div className={styles.wave}></div>}
          {mediaBlobUrl && (
            <audio id="audio" controls className={styles.audioControls} />
          )}
        </div>
        <button
          onClick={recording ? handleStopRecording : handleStartRecording}
          className={styles.startRecordingButton}
        >
          {recording ? <FaStop /> : <FaMicrophone />}
        </button>
        {mediaBlobUrl && (
          <button onClick={transcribeAudio} className={styles.transcribeButton}>
            Transcribe
          </button>
        )}
        {duration && <p>Audio duration: {duration.toFixed(2)}s</p>}
        <div className={styles.transcriptionText}>
          <p>{transcription}</p>
          {command && (
            <div>
              <p>Running: {command}</p>
              <button
                onClick={handleExecuteCommandClick}
                className={styles.executeButton}
              >
                Execute Command
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceModal;
