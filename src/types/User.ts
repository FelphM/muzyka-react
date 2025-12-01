export type User = {
  id: number;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  passwordHash?: string; // Optional, as it won't always be returned or displayed
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
};
