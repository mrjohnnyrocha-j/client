export const startRecording = async (
  setMediaBlobUrl: (url: string | null) => void,
  setAudioBlob: (blob: Blob | null) => void
): Promise<MediaRecorder> => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    setMediaBlobUrl(url);
    setAudioBlob(blob);
    chunks = [];
  };

  mediaRecorder.start();
  return mediaRecorder;
};
