import { Delete, Get, Injectable } from '@nestjs/common';
// import { User } from './../users/user.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseUsersService } from './expense-users.service';
import { Expense } from './expense.model';
import { GetExpenseDto } from './DTO/getAllExpense.dto';
import { AddExpenseDto } from './DTO/addExpense.dto';
import { DeleteExpenseDto } from './DTO/deleteExpense.dto';

@Controller('expense-users')
export class ExpenseUsersController {
  constructor(private readonly ExpenseUsersService: ExpenseUsersService) {} // correct inject User Service

  @Get('all_expense')
  getAllExpense(@Body() getExpenseDto: GetExpenseDto) {
    return this.ExpenseUsersService.getAllExpense(getExpenseDto);
  }

  @Post('addExpense')
  addExpense(@Body() addExpenseDto: AddExpenseDto) {
    return this.ExpenseUsersService.addExpense(addExpenseDto);
  }

  @Delete('deleteExpense')
  deleteExpense(@Body() deleteExpenseDto: DeleteExpenseDto) {
    return this.ExpenseUsersService.deleteExpense(deleteExpenseDto);
  }
}

// {
//    "email": "nit1@gmail.com",
//    "password": "123456"
// }
