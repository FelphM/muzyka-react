import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAllProducts, createProduct, deleteCategory, login, changePassword } from '../src/services/api';

vi.mock('../src/services/apiUtils', () => ({
  API_BASE_URL: 'https://example.com/api',
  getAuthHeader: () => ({ Authorization: 'Bearer mock-token' }),
}));

describe('api service helpers', () => {
  beforeEach(() => {
    // reset global.fetch
    (global as any).fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('getAllProducts returns parsed JSON on success', async () => {
    const mockProducts = [{ id: 1, name: 'P1' }];
    (global as any).fetch.mockResolvedValue({ ok: true, json: async () => mockProducts });

    const res = await getAllProducts();
    expect(res).toEqual(mockProducts);
    expect((global as any).fetch).toHaveBeenCalledWith('https://example.com/api/products');
  });

  it('getAllProducts throws on non-ok', async () => {
    (global as any).fetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(getAllProducts()).rejects.toThrow('HTTP error! status: 500');
  });

  it('createProduct sends POST with auth header and returns created object', async () => {
    const productData = { name: 'New' };
    const created = { id: 2, ...productData };
    (global as any).fetch.mockResolvedValue({ ok: true, json: async () => created });

    const res = await createProduct(productData);
    expect(res).toEqual(created);
    expect((global as any).fetch).toHaveBeenCalledWith('https://example.com/api/products', expect.objectContaining({ method: 'POST' }));
  });

  it('deleteCategory throws error with response property when non-ok', async () => {
    const mockResponse = { ok: false, status: 404 };
    (global as any).fetch.mockResolvedValue(mockResponse);

    await expect(deleteCategory(5)).rejects.toMatchObject({ response: mockResponse });
  });

  it('login returns token object on success', async () => {
    const jwt = { token: 'abc', user: { id: 1 } };
    (global as any).fetch.mockResolvedValue({ ok: true, json: async () => jwt });

    const res = await login({ email: 'a', password: 'b' });
    expect(res).toEqual(jwt);
  });

  it('changePassword throws with remote message on failure', async () => {
    const body = { message: 'Bad password' };
    (global as any).fetch.mockResolvedValue({ ok: false, status: 400, json: async () => body });

    await expect(changePassword('a@b', 'old', 'new')).rejects.toThrow('Bad password');
  });
});
