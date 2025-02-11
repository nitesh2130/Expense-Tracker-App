import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsEmpty()
  typesOfExpense: string;

  @IsNumber()
  @IsEmpty()
  userId: number;

  @IsNumber()
  @IsEmpty()
  amount: number;

  @IsString()
  @IsEmpty()
  description: string;
}
