import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./UpperSideBar.module.css";

interface UpperSideBarProps {
  onSelectTab: (tab: string, color: string) => void;
  activeTabs: string[];
}

const UpperSideBar: React.FC<UpperSideBarProps> = ({
  onSelectTab,
  activeTabs,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const tabs = [
    { name: "auth/sign-in", icon: faSignIn, color: "#FFD700" },
    { name: "auth/sign-up", icon: faPlusCircle, color: "#ADFF2F" },
  ];

  const handleTabChange = (tab: string, color: string) => {
    onSelectTab(tab, color);
  };

  return (
    <div className={styles.upperSidebar}>
      <div className={styles.sidebarLogo}>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Image
              src="/assets/j_logo.png"
              alt="j Logo"
              width={26}
              height={108}
            />
          </a>
        </Link>
      </div>
      {status === "authenticated" && session?.user ? (
        <div className={styles.profileContainer}>
          <Link href={`/auth/profile/${session.user.id}`} passHref legacyBehavior>
            <a className={styles.avatarLink}>
              {/* <Image
                src={session.user.image || "/default-avatar.png"}
                alt="User Avatar"
                width={60}
                height={60}
                className={styles.avatar}
              /> */}
            </a>
          </Link>
          <div className={styles.userNameSettings}>
            <span className={styles.userName}>
              {session.user.name || session.user.email}
            </span>
            <FontAwesomeIcon
              icon={faCog}
              className={styles.settingsButton}
              onClick={() => router.push("/auth/settings")}
            />
          </div>
          <div className={styles.separator}></div>
          <button className={styles.signOutButton} onClick={() => signOut()}>
            <FontAwesomeIcon icon={faSignOut} className={styles.signOutIcon} />
          </button>
        </div>
      ) : (
        <>
          {tabs.map((tab) => (
            <a
              key={tab.name}
              className={`${styles.sidebarItem} ${
                activeTabs.includes(tab.name) ? styles.active : ""
              }`}
              style={{
                backgroundColor: activeTabs.includes(tab.name)
                  ? tab.color
                  : "",
              }}
              onClick={() => handleTabChange(tab.name, tab.color)}
            >
              <FontAwesomeIcon icon={tab.icon} className={styles.signInIcons} />
              <span className={styles.itemText}>
                {`Sign ${tab.name.charAt(4).toUpperCase()}${tab.name.slice(-1)}`}
              </span>
            </a>
          ))}
        </>
      )}
      <SearchBar />
    </div>
  );
};

export default UpperSideBar;
