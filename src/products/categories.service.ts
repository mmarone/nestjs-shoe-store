import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async getCategories() {
    const categories = await this.repository.getCategories();

    return categories.map(({ id, name, products }) => ({
      id,
      name,
      docCount: products.length,
    }));
  }

  async getCategoryById(categoryId: string) {
    const category = await this.repository.getCategoryById(categoryId);

    return category;
  }

  async getProductsByCategoryId(categoryId: string) {
    const products = await this.repository.getProductsByCategoryId(categoryId);

    return products;
  }
}
