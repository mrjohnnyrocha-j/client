import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddContactForm from "@/Contacts/AddContactForm/AddContactForm";
import ContactList from "@/Contacts/ContactList/ContactList";
import Header from "@/Calls/Header/Header";
import VoiceCall from "@/Calls/VoiceCall/VoiceCall";
import Notifications from "@/General/Notifications/Notifications";
import LoadingIndicator from "@/General/LoadingIndicator/LoadingIndicator";
import EmailWindow from "@/Contacts/EmailWindow/EmailWindow";
import SendMoneyWindow from "@/Chats/SendMoneyWindow/SendMoneyWindow";
import { FaPlus, FaPhone, FaUser, FaVideo, FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import styles from "../styles/calls/calls.module.css";
import { fetchData, postData, putData, deleteData } from "../utils/apiClient";
import { useRouter } from "next/router";
import crypto from "crypto";

interface Call {
  id: string;
  userId: string;
  contactId: string;
  callType: "incoming" | "outgoing";
  callTime: string; // ISO string format
  contact: Contact;
}

interface Contact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  profilePic?: string;
  [key: string]: any;  // Add index signature to allow dynamic property access
}

interface PublicCall {
  call_id: string;
  host_user_id: string;
  start_time: string;
  call_title?: string;
  call_description?: string;
}

const CallsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"recents" | "contacts" | "publicCalls">("recents");
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.id;
  const [recents, setRecents] = useState<Call[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [publicCalls, setPublicCalls] = useState<PublicCall[]>([]);
  const [isAddContactFormVisible, setAddContactFormVisible] = useState(false);
  const [isEditContactFormVisible, setEditContactFormVisible] = useState(false);
  const [showEmailWindow, setShowEmailWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSendMoneyWindow, setShowSendMoneyWindow] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchCalls();
      fetchContacts();
    }
  }, [userId]);


  const fetchCalls = async () => {
    try {
      const calls = await fetchData<Call[]>('/calls', { params: { userId } });
      setRecents(Array.isArray(calls) ? calls : []);
    } catch (error) {
      console.error("Error fetching calls:", error);
      setRecents([]); // Ensure recents is an array even if there's an error
    }
  };

  const fetchContacts = async () => {
    try {
      const contacts = await fetchData<Contact[]>('/contacts', { params: { userId } });
      setContacts(Array.isArray(contacts) ? contacts : []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]); // Ensure contacts is an array even if there's an error
    }
  };

  useEffect(() => {
    if (activeTab === "publicCalls") {
      fetchPublicCalls();
    }
  }, [activeTab]);

  const fetchPublicCalls = async () => {
    try {
      const publicCalls = await fetchData<PublicCall[]>('/public-calls', { params: { userId } });
      setPublicCalls(Array.isArray(publicCalls) ? publicCalls : []);
    } catch (error) {
      console.error("Error fetching public calls:", error);
      setPublicCalls([]); // Ensure publicCalls is an array even if there's an error
    }
  };

  const handleCreateNewCall = async () => {
    if (!userId) {
      console.error("User ID is not defined");
      return;
    }
    const timestamp = new Date().toISOString();
    const hash = crypto.createHash("sha256").update(`${userId}${timestamp}`).digest("hex");
    try {
      await postData(`/public-calls`, {
        call_id: hash,
        host_user_id: userId,
        start_time: timestamp,
      });
      router.push(`/calls/${hash}`);
    } catch (error) {
      console.error("Error creating call:", error);
    }
  };

  const handleAddContactClick = () => {
    setAddContactFormVisible(true);
  };

  const handleCloseForm = () => {
    setAddContactFormVisible(false);
    setEditContactFormVisible(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    try {
      if (!userId) {
        console.error("User ID is not defined");
        return;
      }
      const requiredFields = ["name", "phone", "email"];
      for (const field of requiredFields) {
        if (!contact[field]) {
          console.error(`Missing required field: ${field}`);
          setError(`Missing required field: ${field}`);
          return;
        }
      }
      await postData(`/contacts`, { ...contact, userId });
      fetchContacts();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving contact:", error);
      setError("Error saving contact");
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

  const handleStartCall = async (contact: Contact) => {
    if (!contact.id) {
      console.error("Contact ID is not defined");
      return;
    }
    setCurrentContact(contact);
    try {
      await postData(`/calls`, {
        userId,
        contactId: contact.id,
        callType: "outgoing",
        callTime: new Date().toISOString(),
      });
      fetchCalls();
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleResumeCall = async (call: Call) => {
    if (!call.contactId) {
      console.error(`Call ${call.id} is missing a contactId`);
      return;
    }
    const contact = contacts.find((c) => c.id === call.contactId);
    setCurrentContact(contact || null);
    try {
      await postData(`/calls`, {
        userId,
        contactId: call.contactId,
        callType: "incoming",
        callTime: new Date().toISOString(),
      });
      fetchCalls();
    } catch (error) {
      console.error("Error resuming call:", error);
    }
  };

  const handleEndCall = () => {
    setCurrentContact(null);
  };

  const handleDeleteContact = async (contact: Contact) => {
    try {
      await deleteData(`/contacts/${contact.id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDeleteCall = async (call: Call) => {
    try {
      await deleteData(`/calls/${call.id}`);
      fetchCalls();
    } catch (error) {
      console.error("Error deleting call:", error);
    }
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

  const handleSendEmail = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEmailWindow(true);
  };

  const handleSendMoney = (contact: Contact) => {
    setSelectedContact(contact);
    setShowSendMoneyWindow(true);
  };

  const handleStartChat = (contact: Contact) => {
    const timestamp = new Date().toISOString();
    const hash = crypto.createHash("sha256").update(`${userId}${contact.id}${timestamp}`).digest("hex");
    router.push(`/chats/${hash}`);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.callsContainer}>
      <Header onSearch={() => {}}/>
      <div className={styles.tabs}>
        <button
          className={activeTab === "recents" ? styles.active : ""}
          onClick={() => setActiveTab("recents")}
        >
          <FaPhone /> Recents
        </button>
        <button
          className={activeTab === "contacts" ? styles.active : ""}
          onClick={() => setActiveTab("contacts")}
        >
          <FaUser /> Contacts
        </button>
        <button
          className={activeTab === "publicCalls" ? styles.active : ""}
          onClick={() => setActiveTab("publicCalls")}
        >
          <FaVideo /> Public Calls
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "recents" && (
          <ul className={styles.list}>
            {recents.length > 0 ? (
              recents.map((call) => (
                <li key={call.id} className={styles.listItem}>
                  <div className={styles.left}>
                    <img
                      src={call.contact.profilePic || "/default-avatar.png"}
                      alt={call.contact.name}
                      className={styles.avatar}
                    />
                    <div className={styles.details}>
                      <span className={styles.callType}>
                        {call.callType === "outgoing" ? <FaArrowUp /> : <FaArrowDown />}
                      </span>
                      <span className={styles.contactName}>{call.contact.name}</span>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <span className={styles.callTime}>
                      {new Date(call.callTime).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleResumeCall(call)}
                      className={styles.iconButton}
                    >
                      <FaPhone className={styles.icon} />
                    </button>
                    <button
                      onClick={() => handleDeleteCall(call)}
                      className={styles.iconButton}
                    >
                      <FaTrash className={styles.icon} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div>No recent calls</div>
            )}
          </ul>
        )}
        {activeTab === "contacts" && (
          <ContactList
            contacts={contacts}
            onAddContact={handleAddContactClick}
            onCall={handleStartCall}
            onChat={handleStartChat}
            onEdit={handleEditContact}
            onShowInfo={handleShowContactInfo}
            onSendEmail={handleSendEmail}
            onSendMoney={handleSendMoney}
            onDelete={handleDeleteContact}
          />
        )}
        {activeTab === "publicCalls" && (
          <>
            <div className={styles.header}>
              <button
                className={styles.createButton}
                onClick={handleCreateNewCall}
              >
                <FaPlus /> Create New Call
              </button>
            </div>
            <ul className={styles.list}>
              {publicCalls.map((call) => (
                <li key={call.call_id} className={styles.listItem}>
                  <div className={styles.left}>
                    <span className={styles.callTitle}>{call.call_title || "No Title"}</span>
                    <span className={styles.callDescription}>
                      {call.call_description || "No Description"}
                    </span>
                  </div>
                  <span className={styles.callTime}>
                    {new Date(call.start_time).toLocaleString()}
                  </span>
                  <button
                    onClick={() => router.push(`/calls/${call.call_id}`)}
                    className={styles.iconButton}
                  >
                    <FaVideo className={styles.icon} />
                  </button>
                </li>
              ))}
            </ul>
          </>
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
            onCall={handleStartCall}
            onChat={handleStartChat}
            onSendMoney={handleSendMoney}
          />
        )}
        {isEditContactFormVisible && selectedContact && (
          <AddContactForm
            onClose={handleCloseForm}
            onSave={handleUpdateContact}
            contact={selectedContact}
            onCall={handleStartCall}
            onChat={handleStartChat}
            onSendMoney={handleSendMoney}
          />
        )}
      </div>
      {currentContact && (
        <VoiceCall
          contact={currentContact}
          onClose={handleEndCall}
          userId={sessionData?.user?.id || ""} // Use the user ID from the session
        />
      )}
      <Notifications
        currentUser={{
          id: sessionData?.user?.id || "",
          name: sessionData?.user?.name || "Current User",
        }}
      />
      {showEmailWindow && (
        <EmailWindow
          onClose={() => setShowEmailWindow(false)}
          contact={selectedContact}
        />
      )}
      {showSendMoneyWindow && (
        <SendMoneyWindow onClose={() => setShowSendMoneyWindow(false)} />
      )}
    </div>
  );
};

export default CallsPage;
