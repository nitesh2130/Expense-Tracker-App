import { IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';

export class AddExpenseDto {
  @IsString()
  @IsNotEmpty()
  Types_of_Expense: string;

  @IsNumber()
  @IsNotEmpty()
  UserId: number;

  @IsNumber()
  @IsNotEmpty()
  Amount: number;

  @IsString()
  @IsNotEmpty()
  Description: string;
}
