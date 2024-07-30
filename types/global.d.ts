// Extend the Next.js types to include custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;

  }
}

// Declare global types for your application
declare global {
  interface Window {
    FriendlyCaptcha?: {
      reset: () => void;
    };
  }

  // Shared interfaces and types
  interface Message {
    id: number;
    type: string;
    content: string;
    likes: number;
    liked?: boolean;
    replies?: Message[];
  }

  interface Call {
    id: number;
    userId: string;
    contactId: string;
    callType: 'incoming' | 'outgoing';
    callTime: string; // ISO string format
    contactName: string;
    contactPhone: string;
    contactAvatar?: string; // URL string format
  }

  interface Contact {
    id: string;
    userId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    avatar?: string;
  }

  interface Chat {
    id: string;
    userId: string;
    contactId: string;
    chatId: string;
    createdAt: string; // ISO string format
    updatedAt: string; // ISO string format
    contactName: string;
    contactPhone: string;
    contact: Contact;
  }

  interface Reply {
    id: string;
    content: string;
  }

  interface Post {
    id: string;
    content: string;
    userName: string;
    userProfilePic: string;
    createdAt: string;
    likes: number;
    views: number;
    replies: Reply[];
    postType: 'anonymous' | 'authenticated' | 'verified' | 'bot';
  }

  interface User {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    company_name?: string;
    verified: boolean;
  }
}

// Ensure this file is treated as a module
export {};
