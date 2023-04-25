import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

type ProductWithCategories = Prisma.ProductGetPayload<{
  include: {
    categories: {
      select: { category: true };
    };
  };
}>;

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    limit: string,
    offset: string,
  ): Promise<[ProductWithCategories[], number]> {
    const conditions = {
      skip: offset && +offset,
      take: limit && +limit,
      include: {
        categories: {
          select: { category: true },
        },
      },
    };

    const products = this.prisma.product.findMany(conditions);
    const total = this.prisma.product.count();

    return Promise.all([products, total]);
  }

  async getProductById(productId: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async getProductsByCategoryId(
    categoryId: string,
    limit: string,
    offset: string,
  ) {
    const sql = `
      SELECT *
      FROM "Product"
      INNER JOIN "CategoriesOnProducts"
      ON "Product"."id" = "CategoriesOnProducts"."productId"
      WHERE "CategoriesOnProducts"."categoryId" = $1
      LIMIT $2 OFFSET $3
    `;

    const products = this.prisma.$queryRawUnsafe(
      sql,
      categoryId,
      +limit,
      +offset,
    );

    const countSql = `
      SELECT *
      FROM "Product"
      INNER JOIN "CategoriesOnProducts"
      ON "Product"."id" = "CategoriesOnProducts"."productId"
      WHERE "CategoriesOnProducts"."categoryId" = $1
    `;
    const totalProducts = this.prisma.$queryRawUnsafe(countSql, categoryId);

    return Promise.all([products, totalProducts]);
  }
}
