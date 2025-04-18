import { db } from '@/db';
import { orders } from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { desc, gte, sql } from 'drizzle-orm';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  async getAll(page: number, limit: number) {
    const ordersResult = await db.query.orders.findMany({
      limit,
      offset: (page - 1) * limit,
      with: {
        user: { columns: { name: true } },
      },
      columns: {
        userId: false,
      },
      orderBy: desc(orders.createdAt),
    });

    const count = await db
      .select({ count: sql<string>`count(id)` })
      .from(orders);

    return {
      orders: ordersResult,
      count: parseInt(count[0].count),
    };
  }

  async getTotalSalesLastMonth() {
    const now = new Date();
    const totalSales = await db
      .select({ totalSales: sql<string>`sum(total_amount)` })
      .from(orders)
      .where(gte(orders.createdAt, new Date(now.getMonth() - 1)));

    return {
      totalSales: totalSales[0].totalSales,
    };
  }

  async getRecentOrdersCount() {
    const now = new Date();
    return {
      count: parseInt(
        (
          await db
            .select({ count: sql<string>`count(id)` })
            .from(orders)
            .where(gte(orders.createdAt, new Date(now.getDate() - 7)))
        )[0].count,
      ),
    };
  }
  create(dto: CreateOrderDto) {
    throw new Error('Method not implemented.');
  }
}
