import { IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class AddExpenseDto {
  @IsString()
  @IsNotEmpty()
  typesOfExpense: string;

  // @IsNumber()
  // @IsNotEmpty()
  // userId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
