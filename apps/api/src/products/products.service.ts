import { db } from '@/db';
import { keyboards } from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  async getAll(page: number, limit: number) {
    const products = await db.query.keyboards.findMany({
      limit,
      offset: (page - 1) * limit,
      with: {
        category: {
          columns: {
            name: true,
          },
        },
      },
      columns: {
        categoryId: false,
      },
    });

    const count = await db
      .select({ count: sql<number>`count(id)` })
      .from(keyboards);

    return {
      products,
      count: count[0].count,
    };
  }

  async getProductsCount() {
    const count = await db
      .select({ count: sql<number>`count(id)` })
      .from(keyboards);
    return count[0];
  }

  async getOne(id: number) {
    return await db.query.keyboards.findFirst({ where: eq(keyboards.id, id) });
  }
}
