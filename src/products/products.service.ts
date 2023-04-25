import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private repository: ProductsRepository) {}

  async getProducts(limit: string, offset: string) {
    const [products, total] = await this.repository.getProducts(limit, offset);

    return {
      data: products.map((product) => ({
        ...product,
        categories: [
          ...product.categories.map(({ category }) => ({ ...category })),
        ],
      })),
      total,
    };
  }

  async getProductById(productId: string) {
    const product = await this.repository.getProductById(productId);

    return product;
  }

  async getProductsByCategoryId(
    categoryId: string,
    limit: string,
    offset: string,
  ) {
    const [products, totalProducts] =
      await this.repository.getProductsByCategoryId(categoryId, limit, offset);

    return {
      data: products,
      total: (totalProducts as []).length,
    };
  }
}
