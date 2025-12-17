export type User = {
  id: number;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  passwordHash?: string; 
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
};
