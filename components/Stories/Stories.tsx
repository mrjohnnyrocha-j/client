import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import StoryWindow from './StoryWindow/StoryWindow';
import { FaPlus } from 'react-icons/fa';
import styles from './Stories.module.css';

interface Story {
  id: string;
  user: string;
  image: string;
  is_new: boolean;
  title: string;
  content: string;
}

const Stories: React.FC = () => {
  const { data: session } = useSession();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState<File | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        const data = await response.json();
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error('Fetching stories failed', data);
        }
      } catch (err) {
        console.error('Error fetching stories', err);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  const handleAddStory = async () => {
    if (newStory) {
      const formData = new FormData();
      formData.append('file', newStory);
      formData.append('user', session?.user?.name || '');

      try {
        const response = await fetch('/api/uploadStory', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setStories((prevStories) => [...prevStories, data.story]);
        } else {
          console.error('Error uploading story', data);
        }
      } catch (err) {
        console.error('Error uploading story', err);
      }
    }
  };

  const handleUpdateStory = async (updatedStory: Story) => {
    try {
      const response = await fetch(`/api/stories?id=${updatedStory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStory),
      });
      const data = await response.json();
      setStories((prevStories) =>
        prevStories.map((story) => (story.id === updatedStory.id ? data : story))
      );
      setSelectedStory(data);
    } catch (err) {
      console.error('Error updating story', err);
    }
  };

  const handleDeleteStory = async (id: string) => {
    try {
      await fetch(`/api/stories?id=${id}`, {
        method: 'DELETE',
      });
      setStories((prevStories) => prevStories.filter((story) => story.id !== id));
      setSelectedStory(null);
    } catch (err) {
      console.error('Error deleting story', err);
    }
  };

  const moveStoryToEnd = (story: Story) => {
    setStories((prevStories) => {
      const updatedStories = prevStories.filter(s => s.id !== story.id);
      updatedStories.push(story);
      return updatedStories;
    });
  };

  return (
    <div className={styles.storiesContainer}>
      <div className={styles.story} onClick={() => document.getElementById('fileInput')?.click()}>
        <div className={styles.addStory}>
          <FaPlus className={styles.plusIcon} />
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => setNewStory(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      {newStory && (
        <button className={styles.uploadButton} onClick={handleAddStory}>
          Upload Story
        </button>
      )}
      {stories.map((story) => (
        <div
          key={story.id}
          className={styles.story}
          onClick={() => handleStoryClick(story)}
        >
          <img
            src={story.image}
            alt={`${story.user}'s story`}
            className={`${styles.storyImage} ${story.is_new ? styles.newStoryImage : styles.oldStoryImage}`}
          />
          <div className={`${styles.organicShape} ${styles.shape1}`}></div>
          <div className={`${styles.organicShape} ${styles.shape2}`}></div>
          <span>{story.user}</span>
        </div>
      ))}
      {selectedStory && (
        <StoryWindow
          story={selectedStory}
          onClose={handleCloseStory}
          stories={stories}
          setSelectedStory={setSelectedStory}
          onUpdate={handleUpdateStory}
          onDelete={handleDeleteStory}
          moveStoryToEnd={moveStoryToEnd}
        />
      )}
    </div>
  );
};

export default Stories;