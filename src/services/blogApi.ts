import type { Post } from '../types/BlogPost'; // Assuming BlogPost is exported as Post type

// --- Mock Data ---
let mockBlogPosts: Post[] = [];

// --- API Functions (Mocked) ---

/**
 * Simulates fetching all blog posts.
 * @returns A promise that resolves with an array of blog posts.
 */
export const getAllBlogPosts = async (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockBlogPosts]);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates fetching a single blog post by ID.
 * @param id The ID of the blog post.
 * @returns A promise that resolves with the blog post or null if not found.
 */
export const getBlogPostById = async (id: string): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockBlogPosts.find((p) => p.id === id);
      resolve(post || null);
    }, 300); // Simulate network delay
  });
};

/**
 * Simulates creating a new blog post.
 * @param newPost The new blog post data (without ID and date).
 * @returns A promise that resolves with the created blog post including an ID and date.
 */
export const createBlogPost = async (newPost: Omit<Post, 'id' | 'cardDate'>): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdPost: Post = {
        ...newPost,
        id: (mockBlogPosts.length + 1).toString(), // Simple ID generation
        card: {
          ...newPost.card,
          date: new Date(), // Set current date
        },
      };
      mockBlogPosts.push(createdPost);
      resolve(createdPost);
    }, 500);
  });
};

/**
 * Simulates updating an existing blog post.
 * @param id The ID of the blog post to update.
 * @param updatedFields The fields to update.
 * @returns A promise that resolves with the updated blog post or null if not found.
 */
export const updateBlogPost = async (id: string, updatedFields: Partial<Post>): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockBlogPosts.findIndex((p) => p.id === id);
      if (index > -1) {
        const updatedPost: Post = {
          ...mockBlogPosts[index],
          ...updatedFields,
          card: {
            ...mockBlogPosts[index].card,
            ...updatedFields.card,
            date: new Date(), // Update date on modification
          },
          banner: {
            ...mockBlogPosts[index].banner,
            ...updatedFields.banner,
          },
          post: {
            ...mockBlogPosts[index].post,
            ...updatedFields.post,
          }
        };
        mockBlogPosts[index] = updatedPost;
        resolve(updatedPost);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

/**
 * Simulates deleting a blog post by ID.
 * @param id The ID of the blog post to delete.
 * @returns A promise that resolves with true if deleted, false otherwise.
 */
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = mockBlogPosts.length;
      mockBlogPosts = mockBlogPosts.filter((p) => p.id !== id);
      resolve(mockBlogPosts.length < initialLength);
    }, 300);
  });
};
