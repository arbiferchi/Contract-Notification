export interface Supplier {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  id_parent?:string,
  type: 'societe' | 'contact';
  contacts?: Contact[]; // Array of contact objects
  contactDetails?: {
    position: string;
    department: string;
  };
  companyDetails?: {
    industry: string;
    registrationNumber: string;
    website: string;
  };
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  department: string;
  id_parent?: string;
}
