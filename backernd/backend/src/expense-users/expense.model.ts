import { Model } from 'sequelize';
import { AllowNull, Column, DataType, Table } from 'sequelize-typescript';

@Table
export class Expense extends Model<Expense> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  UserId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Types_of_Expense: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Description: string;
}
