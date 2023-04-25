import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private repository: ProductsRepository) {}

  async getProducts() {
    const products = await this.repository.getProducts();

    return products;
  }
}
