import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  FaPlus,
  FaComments,
  FaUser,
  FaInfoCircle,
  FaArrowUp,
} from "react-icons/fa";
import AddContactForm from "@/Contacts/AddContactForm/AddContactForm";
import ChatWindow from "@/Chats/ChatWindow/ChatWindow";
import ChatsList from "@/Chats/ChatsList/ChatsList";
import LoadingIndicator from "@/General/LoadingIndicator/LoadingIndicator";
import styles from "../styles/chats/chats.module.css";
import { fetchData, postData, putData } from "../utils/apiClient";
import Header from "@/Chats/Header/Header";

interface Contact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  profilePic?: string;
}

interface Chat {
  id: string;
  name: string;
}

const ChatsPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  const [activeTab, setActiveTab] = useState<"recents" | "contacts">("recents");
  const [recents, setRecents] = useState<Chat[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddContactFormVisible, setAddContactFormVisible] =
    useState<boolean>(false);
  const [isEditContactFormVisible, setEditContactFormVisible] =
    useState<boolean>(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = useCallback(async () => {
    if (!userId) return;
    try {
      const contactsData = await fetchData<Contact[]>("/contacts", {
        params: { userId },
      });
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  }, [userId]);

  const fetchChatSessions = useCallback(async () => {
    if (!userId) return;
    try {
      const chatSessionsData = await fetchData<Chat[]>("/chats", {
        params: { userId },
      });
      setRecents(Array.isArray(chatSessionsData) ? chatSessionsData : []);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      setRecents([]);
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchContacts();
      await fetchChatSessions();
      setLoading(false);
    })();
  }, [fetchContacts, fetchChatSessions]);

  const handleAddContactClick = () => {
    setAddContactFormVisible(true);
  };

  const handleCloseForm = () => {
    setAddContactFormVisible(false);
    setEditContactFormVisible(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    try {
      await postData("/contacts", { ...contact, userId });
      fetchContacts();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleUpdateContact = async (contact: Contact) => {
    try {
      await putData(`/contacts/${contact.id}`, contact);
      fetchContacts();
      handleCloseForm();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleStartChat = async (contact: Contact) => {
    const timestamp = new Date().toISOString();
    const chatId = `chat-${timestamp}`;
    setCurrentChatId(chatId);
    try {
      await postData("/chats", {
        chatId,
        userId,
        contactId: contact.id,
      });
      fetchChatSessions();
      router.push(`/chats/${chatId}?closable=true`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleResumeChat = (chat: Chat) => {
    setCurrentChatId(chat.id);
    router.push(`/chats/${chat.id}?closable=true`);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditContactFormVisible(true);
  };

  const handleShowContactInfo = (contact: Contact) => {
    setSelectedContact(contact);
    alert(
      `Contact Info: \nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nAddress: ${contact.address}\nNotes: ${contact.notes}`
    );
  };

  const handleCloseChatWindow = () => {
    setCurrentChatId(null);
  };

  if (!session) {
    return <div>Please sign in to view your chats.</div>;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.chatsContainer}>
      <Header onSearch={() => 1} />
      <div className={styles.tabs}>
        <button
          className={activeTab === "recents" ? styles.active : ""}
          onClick={() => setActiveTab("recents")}
        >
          <FaComments /> Recents
        </button>
        <button
          className={activeTab === "contacts" ? styles.active : ""}
          onClick={() => setActiveTab("contacts")}
        >
          <FaUser /> Contacts
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === "recents" && (
          <ChatsList
            chats={recents}
            onChatClick={(chat) => handleResumeChat(chat)}
            onNewChat={() => {}}
          />
        )}
        {activeTab === "contacts" && (
          <ul className={styles.list}>
            {contacts.map((contact) => (
              <li key={contact.id} className={styles.listItem}>
                <div className={styles.left}>
                  <img
                    src={contact.profilePic || "/path/to/avatar.jpg"}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  <div className={styles.details}>
                    <span className={styles.contactName}>{contact.name}</span>
                    <span className={styles.contactPhone}>{contact.phone}</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleStartChat(contact)}
                  >
                    <FaComments className={styles.icon} />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleEditContact(contact)}
                  >
                    <FaUser className={styles.icon} />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleShowContactInfo(contact)}
                  >
                    <FaInfoCircle className={styles.icon} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button className={styles.addButton} onClick={handleAddContactClick}>
          <FaPlus />
        </button>
        {isAddContactFormVisible && (
          <AddContactForm
            onClose={handleCloseForm}
            onSave={handleSaveContact}
            onCall={() => {}}
            onChat={() => {}}
            onSendMoney={() => {}}
          />
        )}
        {isEditContactFormVisible && selectedContact && (
          <AddContactForm
            onClose={handleCloseForm}
            onSave={handleUpdateContact}
            contact={selectedContact}
            onCall={() => {}}
            onChat={() => {}}
            onSendMoney={() => {}}
          />
        )}
      </div>
      {currentChatId && (
        <ChatWindow
          chatId={currentChatId}
          query=""
          type=""
          onThread={() => {}}
          onClose={handleCloseChatWindow}
        />
      )}
    </div>
  );
};

export default ChatsPage;
