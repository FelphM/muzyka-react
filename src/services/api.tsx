import type { User } from '../types/User'; // Import User type

const API_BASE_URL = "http://localhost:5600/api/v1";

interface JwtResponse {
  token: string;
  user: User;
}

// Helper to get authorization header
function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('token');
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
}

// --- Product API Calls ---
export async function getAllProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getProductBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function createProduct(productData: any) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateProduct(id: number, productData: any) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(), // Add auth header
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

// --- Category API Calls ---
export async function getAllCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getCategoryById(id: number) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getCategoryByName(name: string) {
  const response = await fetch(`${API_BASE_URL}/categories/name/${name}`); // Assuming an endpoint for name
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function createCategory(categoryData: any) {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateCategory(id: number, categoryData: any) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteCategory(id: number) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(), // Add auth header
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

// --- User Management API Calls ---
export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      ...getAuthHeader(), // Add auth header
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getUserById(id: number) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: {
      ...getAuthHeader(), // Add auth header
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function createUser(userData: any) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header (Note: for /users POST, this might not always be needed for registration if permitAll, but good for consistency)
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateUser(id: number, userData: any) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // Add auth header
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteUser(id: number) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(), // Add auth header
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

export async function login(credentials: { email: string; password: string; }): Promise<JwtResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}