import { CreatedAt } from 'sequelize-typescript';
import { User } from './../users/user.model';
import { Expense } from './expense.model';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { find } from 'rxjs';
import { Op } from 'sequelize';
import { AddExpenseDto } from './DTO/addExpense.dto';
import { types } from 'node:util';
import { GetExpenseDto } from './DTO/getAllExpense.dto';
import { DeleteExpenseDto } from './DTO/deleteExpense.dto';

@Injectable()
export class ExpenseUsersService {
  constructor(@InjectModel(Expense) private ExpenseModel: typeof Expense) {}

  //This is all Expense for current User
  async getAllExpense(getExpenseDto: GetExpenseDto) {
    const { UserId, Types_of_Expense, startTime, endTime } = getExpenseDto;

    if (!UserId) {
      throw new BadGatewayException('userId is required');
    }

    //get data to the respect of userId , Types of Expense and time fream
    if (UserId && Types_of_Expense && startTime && endTime) {
      const allExpense = await this.ExpenseModel.findAll({
        where: {
          UserId: UserId,
          Types_of_Expense: Types_of_Expense,
          createdAt: {
            [Op.gte]: new Date(startTime),
            [Op.lte]: new Date(endTime),
          },
        },
      });

      return allExpense;
    } else {
      // get data to the respect of userId and types of Expense
      if (UserId && Types_of_Expense) {
        const allExpense = await this.ExpenseModel.findAll({
          where: {
            UserId: UserId,
            Types_of_Expense: Types_of_Expense,
          },
        });

        return allExpense;
      }
      // get data to the respect of userId and time fream
      if (UserId && startTime && endTime) {
        const allExpense = await this.ExpenseModel.findAll({
          where: {
            UserId: UserId,
            createdAt: {
              [Op.gte]: new Date(startTime),
              [Op.lte]: new Date(endTime),
            },
          },
        });
        return allExpense;
      }
    }

    // get datato the respect of userId only
    if (UserId && !Types_of_Expense && !startTime && !endTime) {
      const allExpense = await this.ExpenseModel.findAll({
        where: { UserId: UserId },
      });
      return allExpense;
    }
  }

  //TO add Expenses in the table for the user
  async addExpense(addExpenseDto: AddExpenseDto) {
    const { UserId, Types_of_Expense, Amount, Description } = addExpenseDto;

    if (!UserId || !Types_of_Expense || !Amount || !Description) {
      throw new BadGatewayException('all feild required');
    }

    const CreatedAt = new Date();
    console.log(CreatedAt, 'this is the data');
    console.log(Amount, 'this is UserId');

    const expense = await this.ExpenseModel.create({
      UserId: UserId,
      Types_of_Expense: Types_of_Expense,
      Amount: Amount,
      Description: Description,
      createdAt: CreatedAt,
    });
    console.log(expense, ' this is the expense ');

    return expense;
  }

  //delete the user Expense
  async deleteExpense(deleteExpenseDto: DeleteExpenseDto) {
    const { id } = deleteExpenseDto;

    const expense = await this.ExpenseModel.findByPk(id);
    console.log(expense, 'this is Expense those i want to delete ');
    if (!expense) {
      throw new NotFoundException('this data not found');
    }

    await expense.destroy();
    return { message: 'Data is Successfully' };
  }

  // update the user expense
}
