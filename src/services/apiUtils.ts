export const API_BASE_URL = "https://muzyka-backend.onrender.com/api/v1";

export function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('token');
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
}
