import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  userId: number;

  @ApiProperty()
  @IsDecimal()
  @Min(1)
  totalAmount: string;
}
