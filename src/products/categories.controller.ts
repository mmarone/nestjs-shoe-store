import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':categoryId')
  getCategoryById(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Get(':categoryId/products')
  getProductsByCategoryId(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getProductsByCategoryId(categoryId);
  }
}
