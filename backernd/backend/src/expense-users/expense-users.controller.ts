import { Delete, Get, Injectable, Put, Req, UseGuards } from '@nestjs/common';
// import { User } from './../users/user.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseUsersService } from './expense-users.service';
import { GetExpenseDto } from './DTO/getAllExpense.dto';
import { AddExpenseDto } from './DTO/addExpense.dto';
import { DeleteExpenseDto } from './DTO/deleteExpense.dto';
import { UpdateExpenseDto } from './DTO/updateExpense.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.gaurd';
import { User } from 'src/users/user.model';
// import { User } from 'src/users/user.model';

@UseGuards(JwtAuthGuard)
@Controller('expense-users')
export class ExpenseUsersController {
  constructor(private readonly ExpenseUsersService: ExpenseUsersService) {} // correct inject User Service

  @Get('all_expense')
  getAllExpense(@Body() getExpenseDto: GetExpenseDto) {
    return this.ExpenseUsersService.getAllExpense(getExpenseDto);
  }

  @Post('addExpense')
  addExpense(@Body() addExpenseDto: AddExpenseDto, @Req() req: any) {
    const userId = req?.user?.userId;
    console.log(userId, 'this is also user');

    return this.ExpenseUsersService.addExpense(addExpenseDto, userId);
  }

  @Delete('deleteExpense')
  deleteExpense(@Body() deleteExpenseDto: DeleteExpenseDto) {
    return this.ExpenseUsersService.deleteExpense(deleteExpenseDto);
  }

  @Put('updateExpense')
  updateExpense(@Body() updateExpenseDto: UpdateExpenseDto) {
    return this.ExpenseUsersService.updateExpense(updateExpenseDto);
  }
}

// {
//    "email": "nit1@gmail.com",
//    "password": "123456"
// }
