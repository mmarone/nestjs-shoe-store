import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() query) {
    return this.productsService.getProducts(query.limit, query.offset);
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return this.productsService.getProductById(productId);
  }

  @Get('category/:categoryId')
  getProductsByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query() query,
  ) {
    return this.productsService.getProductsByCategoryId(
      categoryId,
      query.limit,
      query.offset,
    );
  }
}
