// import { Model } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'Expense',
  timestamps: true,
})
export class Expense extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Types_of_Expense: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Description: string;

  @Column({
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;

  // @Column({ type: DataType.DATE })
  // createdAt: Date;
}
