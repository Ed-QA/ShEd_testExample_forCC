import { expect, test } from '@playwright/test';
import { ToolshopApi, type CategoryNode } from '../../src/api/toolshop-api';

function flattenCategories(categories: CategoryNode[]): CategoryNode[] {
  return categories.flatMap((category) => [category, ...flattenCategories(category.sub_categories ?? [])]);
}

test.describe('API contract checks', () => {
  test('products list returns paginated product data with required fields', async ({ request }) => {
    const products = await new ToolshopApi(request).getProducts();

    expect(products.current_page).toBeGreaterThanOrEqual(1);
    expect(products.data.length).toBeGreaterThan(0);
    expect(products.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String)
      })
    );
  });

  test('product detail matches an item from the product list', async ({ request }) => {
    const api = new ToolshopApi(request);
    const products = await api.getProducts();
    const selectedProduct = products.data[0];

    const detail = await api.getProduct(selectedProduct.id);

    expect(detail).toEqual(
      expect.objectContaining({
        id: selectedProduct.id,
        name: selectedProduct.name
      })
    );
  });

  test('category tree contains parent categories and nested subcategories', async ({ request }) => {
    const categories = await new ToolshopApi(request).getCategories();
    const allCategories = flattenCategories(categories);

    expect(categories.length).toBeGreaterThan(0);
    expect(allCategories.some((category) => category.parent_id !== null)).toBeTruthy();
    expect(allCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String)
        })
      ])
    );
  });

  test('brands endpoint returns selectable product brands', async ({ request }) => {
    const brands = await new ToolshopApi(request).getBrands();

    expect(brands.length).toBeGreaterThan(0);
    expect(brands[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String)
      })
    );
  });

  test('product search returns results relevant to the query', async ({ request }) => {
    const products = await new ToolshopApi(request).searchProducts('hammer');

    expect(products.data.length).toBeGreaterThan(0);
    expect(products.data.some((product) => product.name.toLowerCase().includes('hammer'))).toBeTruthy();
  });
});
