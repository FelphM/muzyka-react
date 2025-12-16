import type { Post } from '../types/BlogPost';
import { API_BASE_URL, getAuthHeader } from './apiUtils';

export const getAllBlogPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/blogposts`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getBlogPostById = async (id: string): Promise<Post | null> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const createBlogPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/blogposts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updateBlogPost = async (id: string, updatedFields: Partial<Post>): Promise<Post | null> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.status === 204; // No Content
};