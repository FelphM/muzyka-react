export type User = {
  id: number;
  name: string;
  email: string;
  passwordHash?: string; // Optional, as it won't always be returned or displayed
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
};
