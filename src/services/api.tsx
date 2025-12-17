import type { User } from '../types/User'; 
import { API_BASE_URL, getAuthHeader } from './apiUtils';

interface JwtResponse {
  token: string;
  user: User;
}

// --- Llamada API Productos ---
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

// --- Llamada Api Categorias---
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
  const response = await fetch(`${API_BASE_URL}/categories/name/${name}`); 
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
    },
  });
  if (!response.ok) {
    const error: any = new Error(`HTTP error! status: ${response.status}`);
    error.response = response; 
    throw error;
  }
  return response.status;
}

// --- Llamada API User Management ---
export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
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
      ...getAuthHeader(), 
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateUserProfile(userData: any) {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteUserProfile(): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

export async function deleteUser(id: number) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(), 
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status;
}

// --- Llamada API Order Management ---
export async function createOrder(orderData: { userId: number; items: { productId: number; quantity: number }[] }) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getAllOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateOrderStatus(orderId: number, status: string) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function getOrdersByUserId(userId: number) {
  const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
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

export async function changePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ email, currentPassword, newPassword }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
}