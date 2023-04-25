import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: true;
  };
}>;

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<CategoryWithProducts[]> {
    return this.prisma.category.findMany({
      include: {
        products: true,
      },
    });
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  async getProductsByCategoryId(
    categoryId: string,
  ): Promise<CategoryWithProducts> {
    return this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        products: {
          include: { product: true },
        },
      },
    });
  }
}
