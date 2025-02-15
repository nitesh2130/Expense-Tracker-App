// import { CreatedAt } from 'sequelize-typescript';
import { Expense } from './expense.model';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { find, throwError } from 'rxjs';
import { Op } from 'sequelize';
import { AddExpenseDto } from './DTO/addExpense.dto';
import { types } from 'node:util';
import { GetExpenseDto } from './DTO/getAllExpense.dto';
import { DeleteExpenseDto } from './DTO/deleteExpense.dto';
import { UpdateExpenseDto } from './DTO/updateExpense.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ExpenseUsersService {
  constructor(@InjectModel(Expense) private ExpenseModel: typeof Expense) {}

  //This is all Expense for current User
  async getAllExpense(getExpenseDto: GetExpenseDto, userId: any) {
    const { typesOfExpense, startTime, endTime } = getExpenseDto;

    if (!userId) {
      throw new BadGatewayException('userId is required');
    }

    console.log(startTime, ' this is startTime');
    //get data to the respect of userId , Types of Expense and time fream
    if (userId && typesOfExpense && startTime && endTime) {
      console.log('..................this is running .................');
      console.log(startTime, ' this is startTime');
      const allExpense = await this.ExpenseModel.findAll({
        where: {
          userId: userId,
          // typesOfExpense: typesOfExpense,

          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('typesOfExpense')),
              typesOfExpense.toLowerCase(), // Convert input value to lowercase
            ),
          ],
          createdAt: {
            [Op.gte]: new Date(startTime),
            [Op.lte]: new Date(endTime),
          },
        },
      });

      return allExpense;
    } else {
      // get data to the respect of userId and types of Expense
      if (userId && typesOfExpense) {
        // console.log('..................this is running .................');
        const allExpense = await this.ExpenseModel.findAll({
          where: {
            userId: userId,
            // typesOfExpense: typesOfExpense,
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('typesOfExpense')),
                typesOfExpense.toLowerCase(), // Convert input value to lowercase
              ),
            ],
          },
        });

        return allExpense;
      }
      // get data to the respect of userId and time fream
      if (userId && startTime && endTime) {
        const allExpense = await this.ExpenseModel.findAll({
          where: {
            userId: userId,
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
    if (userId && !typesOfExpense && !startTime && !endTime) {
      const allExpense = await this.ExpenseModel.findAll({
        where: { userId: userId },
      });
      return allExpense;
    }
  }

  //TO add Expenses in the table for the user
  async addExpense(addExpenseDto: AddExpenseDto, userId: any) {
    const { typesOfExpense, amount, description } = addExpenseDto;

    if (!userId) {
      throw new BadGatewayException('userId not available');
    }
    console.log(userId, '...this is userId');
    console.log(amount, '...this is amount');
    console.log(typesOfExpense, '...this is typesOfExpense');
    console.log(description, '...this is description');

    if (!typesOfExpense || !amount || !description) {
      throw new BadGatewayException('all feild required');
    }

    const createdAt = new Date();
    console.log(createdAt, 'this is the data');
    console.log(amount, 'this is UserId');

    const expense = await this.ExpenseModel.create({
      userId: userId,
      typesOfExpense: typesOfExpense,
      amount: amount,
      description: description,
      createdAt: createdAt,
    });
    console.log(expense, ' this is the expense ');

    return expense;
  }

  //delete the user Expense
  async deleteExpense(deleteExpenseDto: DeleteExpenseDto) {
    const { id } = deleteExpenseDto;
    console.log(id, '....................id');

    const expense = await this.ExpenseModel.findByPk(id);
    console.log(expense, 'this is Expense those i want to delete ');
    if (!expense) {
      throw new NotFoundException('this data not found');
    }

    await expense.destroy();
    return { message: 'Data is Successfully' };
  }

  // update the user expense
  async updateExpense(updateExpenseDto: UpdateExpenseDto) {
    const { typesOfExpense, amount, description, id } = updateExpenseDto;
    if (!id) {
      throw new NotFoundException('not found id of the Expense');
    }

    if (!typesOfExpense || !amount || !description) {
      throw new NotFoundException(
        'Not have any data for the update in the expense',
      );
    }

    console.log(typesOfExpense, 'this is typesOfExpense');
    const expense = await this.ExpenseModel.findByPk(id);

    if (!expense) {
      throw new NotFoundException('not found id of the Expense');
    }

    const newExpense = await expense.update(updateExpenseDto);

    return { newExpense, message: 'User Expense is updated' };
  }
}
