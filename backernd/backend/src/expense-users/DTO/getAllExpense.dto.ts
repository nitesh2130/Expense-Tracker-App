import {
  IsDate,
  isDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class GetExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  UserId: number;

  @IsString()
  @IsEmpty()
  Types_of_Expense: string;

  @IsDate()
  @IsEmpty()
  startTime: Date;

  @IsDate()
  @IsEmpty()
  endTime: Date;
}
