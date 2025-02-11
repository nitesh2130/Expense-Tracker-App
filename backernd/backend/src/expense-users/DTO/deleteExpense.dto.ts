import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
