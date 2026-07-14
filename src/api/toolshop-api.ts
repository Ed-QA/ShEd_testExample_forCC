import { expect, type APIRequestContext } from '@playwright/test';

export type ProductListResponse = {
  current_page: number;
  data: Array<{
    id: string;
    name: string;
    description?: string;
    price?: number;
    category_id?: string;
    brand_id?: string;
  }>;
  total?: number;
};

export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  sub_categories: CategoryNode[];
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export class ToolshopApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<ProductListResponse> {
    const response = await this.request.get(process.env.API_URL ?? 'https://api.practicesoftwaretesting.com/products');
    await expect(response, 'Products API should respond successfully').toBeOK();
    return response.json();
  }

  async getProduct(productId: string): Promise<Record<string, unknown>> {
    const response = await this.request.get(`https://api.practicesoftwaretesting.com/products/${productId}`);
    await expect(response, 'Product detail API should respond successfully').toBeOK();
    return response.json();
  }

  async searchProducts(query: string): Promise<ProductListResponse> {
    const response = await this.request.get(`https://api.practicesoftwaretesting.com/products/search?q=${encodeURIComponent(query)}`);
    await expect(response, 'Product search API should respond successfully').toBeOK();
    return response.json();
  }

  async getCategories(): Promise<CategoryNode[]> {
    const response = await this.request.get(process.env.API_URL_CATEGORIES ?? 'https://api.practicesoftwaretesting.com/categories/tree');
    await expect(response, 'Categories API should respond successfully').toBeOK();
    return response.json();
  }

  async getBrands(): Promise<Brand[]> {
    const response = await this.request.get('https://api.practicesoftwaretesting.com/brands');
    await expect(response, 'Brands API should respond successfully').toBeOK();
    return response.json();
  }
}
