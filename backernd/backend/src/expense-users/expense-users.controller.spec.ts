import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUsersController } from './expense-users.controller';

describe('ExpenseUsersController', () => {
  let controller: ExpenseUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseUsersController],
    }).compile();

    controller = module.get<ExpenseUsersController>(ExpenseUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
