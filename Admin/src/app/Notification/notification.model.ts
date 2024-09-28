export interface Notification {
    _id?: string; // Optional, since MongoDB automatically assigns it
    contractId?: string | null; // Optional, can be null as per Mongoose schema
    userId: string; // Required
    title: string; // Required
    type: string; // Required, e.g., 'email', 'sms', 'web-push'
    message: string; // Required
    sendAt: Date;  // Ensure this is a Date
    sent?: boolean; // Optional, default is false
    status?: 'pending' | 'sent' | 'failed'; // Optional, with specific string literals as values
    createdAt?: Date; // Optional, automatically set by the backend
    updatedAt?: Date; // Optional, automatically set by the backend
    priority?: 'low' | 'medium' | 'high'; // Optional, with specific string literals as values
    channel: string; // Required, e.g., 'email', 'sms', 'web-push'
    retries?: number; // Optional, default is 0
    maxRetries?: number; // Optional, default is 3
    error?: string; // Optional, default is an empty string
  }
  export interface SelectableNotification extends Notification {
    isSelected?: boolean; // Add this line
  }