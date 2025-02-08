import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseUsersService } from './expense-users.service';

describe('ExpenseUsersService', () => {
  let service: ExpenseUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseUsersService],
    }).compile();

    service = module.get<ExpenseUsersService>(ExpenseUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
