import {
  IsDate,
  isDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class GetExpenseDto {
  @IsString()
  @IsEmpty()
  typesOfExpense: string;

  @IsDate()
  @IsEmpty()
  startTime: Date;

  @IsDate()
  @IsEmpty()
  endTime: Date;
}
