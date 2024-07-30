import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import FullScreenSection from "@/General/FullScreenSection/FullScreenSection";
import PostList from "@/Posts/PostList/PostList";
import Header from "@/Auth/Profiles/Header/Header";
import Image from "next/image";
import styles from "../../../styles/auth/profiles/profile.module.css";

const initialFiles = [
  {
    name: "Resume.pdf",
    type: "file",
    icon: "/assets/pdf-file.svg",
    content: "/path/to/resume.pdf",
  },
  {
    name: "Project.zip",
    type: "file",
    icon: "/assets/zip-file.svg",
    content: "/path/to/project.zip",
  },
  {
    name: "Presentation.pptx",
    type: "file",
    icon: "/assets/ppt-file.svg",
    content: "/path/to/presentation.pptx",
  },
];

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [profileUser, setProfileUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pictures, setPictures] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [publicFiles, setPublicFiles] = useState(initialFiles);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`/api/profiles/${id}`);
          setProfileUser(userResponse.data);

          const postsResponse = await axios.get(`/api/posts?user_id=${id}`);
          setPosts(postsResponse.data);

          const picturesResponse = await axios.get(
            `/api/pictureposts?user_id=${id}`
          );
          setPictures(picturesResponse.data);

          const videosResponse = await axios.get(`/api/videos?user_id=${id}`);
          setVideos(videosResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUserData();
    }
  }, [id]);

  const handleExpand = (section: string) => {
    setExpandedSection(section);
  };

  const handleCollapse = () => {
    setExpandedSection(null);
  };

  const handleClick = (section: string) => {
    setClickedSection(section);
  };

  const handleLike = async (postId: number) => {
    try {
      await axios.post(`/api/posts/${postId}/like`);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleReply = (postId: number) => {
    router.push(`/community/${postId}`);
  };

  const handleShare = (post: any) => {
    alert("Share functionality is not implemented yet.");
  };

  const handlePostClick = (postId: number) => {
    router.push(`/community/${postId}`);
  };

  const handleItemDoubleClick = (item: any) => {
    alert(`Opening ${item.name}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!profileUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className={styles.container}>
      <Header
        userProfilePic={profileUser?.image || "/default-avatar.png"}
        userName={profileUser?.name || "User Name"}
        userEmail={profileUser?.email || "user@example.com"}
      />
      <div className={styles.profileHeader}>
        <Image
          src={profileUser?.image || "/default-avatar.png"}
          alt="Profile Picture"
          width={150}
          height={150}
          className={`${styles.profilePic} ${styles.activeStory}`}
        />
        <div className={styles.userInfo}>
          <h1>{profileUser?.name}</h1>
          <h2>{profileUser?.email}</h2>
          <div className={styles.userActions}>
            <button className={styles.actionButton}>Send Message</button>
            <button className={styles.actionButton}>Subscribe</button>
            <button className={styles.actionButton}>Invite</button>
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {/* <FullScreenSection
          id="posts"
          title="Posts"
          expanded={expandedSection === "posts"}
          clicked={clickedSection === "posts"}
          onExpand={() => handleExpand("posts")}
          onCollapse={handleCollapse}
          onClick={() => handleClick("posts")}
          collapseSection={handleCollapse}
        >
          <PostList
            posts={posts}
            onLike={handleLike}
            onReply={handleReply}
            onShare={handleShare}
            onPostClick={handlePostClick}
          />
        </FullScreenSection> */}
        <FullScreenSection
          id="pictures"
          title="Picture Posts"
          expanded={expandedSection === "pictures"}
          clicked={clickedSection === "pictures"}
          onExpand={() => handleExpand("pictures")}
          onCollapse={handleCollapse}
          onClick={() => handleClick("pictures")}
          collapseSection={handleCollapse}
        >
          <ul className={styles.postList}>
            {pictures.map((picture, index) => (
              <li key={index} className={styles.postItem}>
                <img src={picture.url} alt={`Picture Post ${index}`} />
              </li>
            ))}
          </ul>
        </FullScreenSection>
        <FullScreenSection
          id="videos"
          title="Videos"
          expanded={expandedSection === "videos"}
          clicked={clickedSection === "videos"}
          onExpand={() => handleExpand("videos")}
          onCollapse={handleCollapse}
          onClick={() => handleClick("videos")}
          collapseSection={handleCollapse}
        >
          <ul className={styles.postList}>
            {videos.map((video, index) => (
              <li key={index} className={styles.postItem}>
                <video src={video.url} controls />
              </li>
            ))}
          </ul>
        </FullScreenSection>
        <FullScreenSection
          id="publicFiles"
          title="Public Files"
          expanded={expandedSection === "publicFiles"}
          clicked={clickedSection === "publicFiles"}
          onExpand={() => handleExpand("publicFiles")}
          onCollapse={handleCollapse}
          onClick={() => handleClick("publicFiles")}
          collapseSection={handleCollapse}
        >
          <div className={styles.fileList}>
            {publicFiles.map((file, index) => (
              <div
                key={index}
                className={styles.fileItem}
                onDoubleClick={() => handleItemDoubleClick(file)}
              >
                <img src={file.icon} alt={file.name} />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        </FullScreenSection>
      </div>
    </div>
  );
};

export default ProfilePage;
