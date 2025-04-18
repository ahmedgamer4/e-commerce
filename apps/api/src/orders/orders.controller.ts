import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    this.ordersService.create(dto);
  }

  @Get('total-sales-last-month')
  getTotalSalesLastMonth() {
    return this.ordersService.getTotalSalesLastMonth();
  }

  @Get()
  getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.ordersService.getAll(page, limit);
  }

  @Get('recent-orders-count')
  getRecentOrdersCount() {
    return this.ordersService.getRecentOrdersCount();
  }
}
