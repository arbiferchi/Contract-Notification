export interface Contract {
  
    userId: string;
    supplierId: string;
    contacts: string[];
    title: string;
    description: string;
    shortDescription?: string;
    tag?: string;
    montant?: number;
    startDate: string; // Format: YYYY-MM-DD
    dueDate: string; // Format: YYYY-MM-DD
    status: 'completed' | 'en cours' | 'blocker';
    notificationId:string;
  }
  