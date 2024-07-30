import React, { useState, useEffect } from 'react';
import { FaTimes, FaHeart, FaReply, FaSmile, FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';
import EmojiWindow from '../../Chats/EmojiWindow/EmojiWindow';
import ShareWindowStory from '../../Chats/ShareWindow/Story/ShareWindowStory';
import styles from './StoryWindow.module.css';

interface Story {
  id: string;
  user: string;
  image: string;
  is_new: boolean;
  title: string;
  content: string;
}

interface StoryWindowProps {
  story: Story;
  onClose: () => void;
  stories: Story[];
  setSelectedStory: (story: Story) => void;
  onUpdate: (story: Story) => void;
  onDelete: (id: string) => void;
  moveStoryToEnd: (story: Story) => void;
}

const StoryWindow: React.FC<StoryWindowProps> = ({ story, onClose, stories, setSelectedStory, onUpdate, onDelete, moveStoryToEnd }) => {
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState('');
  const [isShareWindowVisible, setIsShareWindowVisible] = useState(false);
  const [isEmojiWindowVisible, setIsEmojiWindowVisible] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<{ [emoji: string]: number }>({});
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(story.title);
  const [updatedContent, setUpdatedContent] = useState(story.content);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleNextStoryToEnd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story, stories, setSelectedStory]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    setIsShareWindowVisible(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmojis(prev => ({
      ...prev,
      [emoji]: prev[emoji] ? prev[emoji] + 1 : 1
    }));
  };

  const handleEmojiClick = () => {
    setIsEmojiWindowVisible(!isEmojiWindowVisible);
  };

  const handleReply = () => {
    console.log(`Replied to story: ${reply}`);
    setReply('');
  };
  const handleNextStory = () => {
    const currentIndex = stories.findIndex(s => s.id === story.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    setSelectedStory(stories[nextIndex]);
  };

  const handleNextStoryToEnd = () => {
    const currentIndex = stories.findIndex(s => s.id === story.id);
    const nextIndex = (currentIndex + 1) % stories.length;
    const updatedStories = [...stories];
    const [currentStory] = updatedStories.splice(currentIndex, 1);
    updatedStories.push(currentStory);
    setSelectedStory(updatedStories[nextIndex]);
    moveStoryToEnd(currentStory);
  };

  const handlePrevStory = () => {
    const currentIndex = stories.findIndex(s => s.id === story.id);
    const prevIndex = (currentIndex - 1 + stories.length) % stories.length;
    setSelectedStory(stories[prevIndex]);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    onUpdate({ ...story, title: updatedTitle, content: updatedContent });
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(story.id);
  };

  const handleClose = () => {
    moveStoryToEnd(story);
    onClose();
  };

  const moveToRightEnd = () => {
    handleNextStory();
    moveStoryToEnd(story);
  };

  return (
    <div className={styles.storyWindow}>
      <button className={styles.closeButton} onClick={handleClose}>
        <FaTimes />
      </button>
      <div className={styles.navigationButtonLeft} onClick={handlePrevStory}>
        <FaArrowLeft />
      </div>
      <div className={styles.storyContent}>
        {editMode ? (
          <div className={styles.editMode}>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className={styles.editInput}
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className={styles.editTextarea}
            />
            <button onClick={handleUpdate} className={styles.saveButton}>Save</button>
          </div>
        ) : (
          <>
            <img src={story.image} alt={`${story.user}'s story`} className={styles.storyImage} />
            <h2>{story.title}</h2>
            <p>{story.content}</p>
            <div className={styles.actions}>
              <FaHeart className={`${styles.icon} ${liked ? styles.liked : ''}`} onClick={handleLike} />
              <FaReply className={styles.icon} onClick={handleShare} />
              <FaSmile className={styles.icon} onClick={handleEmojiClick} />
              <FaEdit className={styles.icon} onClick={handleEdit} />
              <FaTrash className={styles.icon} onClick={handleDelete} />
            </div>
          </>
        )}
        <div className={styles.selectedEmojis}>
          {Object.entries(selectedEmojis).map(([emoji, count]) => (
            <span key={emoji} className={styles.selectedEmoji}>
              {emoji} {count}
            </span>
          ))}
        </div>
        <div className={styles.replyContainer}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className={styles.replyInput}
          />
          <button onClick={handleReply} className={styles.replyButton}>
            Reply
          </button>
        </div>
      </div>
      <div className={styles.navigationButtonRight} onClick={moveToRightEnd}>
        <FaArrowRight />
      </div>
      {isEmojiWindowVisible && (
        <EmojiWindow onSelect={handleEmojiSelect} onClose={() => setIsEmojiWindowVisible(false)} />
      )}
      {isShareWindowVisible && (
        <ShareWindowStory
          message={`Check out this story by ${story.user}`}
          onClose={() => setIsShareWindowVisible(false)}
          onSubmit={shareInput => console.log(`Shared with: ${shareInput}`)}
        />
      )}
    </div>
  );
};

export default StoryWindow;
