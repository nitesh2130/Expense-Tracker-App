import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'User',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
