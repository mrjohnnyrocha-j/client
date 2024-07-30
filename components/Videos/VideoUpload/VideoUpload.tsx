import React, { useState } from 'react';
import axios from 'axios';
import styles from './VideoUpload.module.css';

const VideoUpload: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleUpload = async () => {
    try {
      const response = await axios.post('/api/uploadVideo', { url: videoUrl });
      console.log('Video uploaded:', response.data);
      // Trigger video list reload after successful upload
      window.dispatchEvent(new Event('videoUploaded'));
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className={styles.uploadForm}>
      <input 
        type="text" 
        value={videoUrl} 
        onChange={(e) => setVideoUrl(e.target.value)} 
        placeholder="Enter video URL" 
        className={styles.videoInput} 
      />
      <button onClick={handleUpload} className={styles.uploadButton}>Upload Video</button>
    </div>
  );
};

export default VideoUpload;
