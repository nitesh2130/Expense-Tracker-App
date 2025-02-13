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
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  typesOfExpense: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;
  // data: any;

  // @Column({ type: DataType.DATE })
  // createdAt: Date;
}
