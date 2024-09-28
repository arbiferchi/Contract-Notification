export interface Contact {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    position?: string;
    department?: string;
    id_parent?: string; // Supplier ID
    deletedAt?: Date;
  }
  