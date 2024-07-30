import React, { useEffect, useState } from "react";
import { FaPlus, FaPhone, FaCommentDots, FaEdit, FaSortAlphaDown, FaFilter, FaInfoCircle, FaRegEnvelope, FaMoneyBillAlt, FaTrash } from "react-icons/fa";
import styles from "./ContactList.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

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

interface ContactListProps {
  contacts: Contact[];
  onAddContact: () => void;
  onCall: (contact: Contact) => void;
  onChat: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onShowInfo: (contact: Contact) => void;
  onSendEmail: (contact: Contact) => void;
  onSendMoney: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onAddContact,
  onCall,
  onChat,
  onEdit,
  onShowInfo,
  onSendEmail,
  onSendMoney,
  onDelete,
}) => {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    let sortedContacts = [...contacts];
    if (sortOrder === "asc") {
      sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedContacts.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (filter) {
      sortedContacts = sortedContacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    setFilteredContacts(sortedContacts);
  }, [contacts, sortOrder, filter]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.contactList}>
      <div className={styles.header}>
        <FaSortAlphaDown
          className={styles.headerIcon}
          onClick={toggleSortOrder}
        />
        <FaFilter className={styles.headerIcon} />
        <input
          type="text"
          placeholder="Filter contacts..."
          value={filter}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
      </div>
      <ul className={styles.list}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.listItem}>
            <div className={styles.left}>
              {/* <img
                src={contact.profilePic || '/default-avatar.png'}
                alt={contact.name}
                className={styles.avatar}
              /> */}
              <div className={styles.details}>
                <span className={styles.contactName}>{contact.name}</span>
              </div>
            </div>
            <span className={styles.contactPhone}>{contact.phone}</span>
            <div className={styles.actions}>
              <button
                onClick={() => onCall(contact)}
                className={styles.iconButton}
              >
                <FaPhone className={styles.icon} />
              </button>
              <button
                onClick={() => onChat(contact)}
                className={styles.iconButton}
              >
                <FaCommentDots className={styles.icon} />
              </button>
              <button
                onClick={() => onEdit(contact)}
                className={styles.iconButton}
              >
                <FaEdit className={styles.icon} />
              </button>
              <button
                onClick={() => onShowInfo(contact)}
                className={styles.iconButton}
              >
                <FaInfoCircle className={styles.icon} />
              </button>
              <button
                onClick={() => onSendEmail(contact)}
                className={styles.iconButton}
              >
                <FaRegEnvelope className={styles.icon} />
              </button>
              <button
                onClick={() => onSendMoney(contact)}
                className={styles.iconButton}
              >
                <FaMoneyBillAlt className={styles.icon} />
              </button>
              <button
                onClick={() => onDelete(contact)}
                className={styles.iconButton}
              >
                <FaTrash className={styles.icon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.addButton} onClick={onAddContact}>
        <FaPlus />
      </div>
    </div>
  );
};

export default ContactList;
