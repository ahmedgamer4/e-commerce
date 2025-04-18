import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Get('count')
  async getProductsCount() {
    return this.productsService.getProductsCount();
  }

  @Get()
  async getAll(page: number, limit: number) {
    return this.productsService.getAll(page, limit);
  }
}
