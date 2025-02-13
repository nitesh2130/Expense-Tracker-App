import { LoginDto } from './DTO/login.dto';
import { RegisterUserDto } from './DTO/register.dto';
import { JwtAuthGuard } from './jwt-auth.gaurd';
import { UsersService } from './users.service';
import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {} // correct inject User Service

  //controller for register the user
  @Post('register')
  RegisterUser(@Body() registerUserDto: RegisterUserDto) {
    return this.UsersService.registerUser(registerUserDto);
  }

  //controller for login the user
  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.UsersService.loginUser(loginDto);
  }

  //LogOut for the user

  // @Post('logout')
  // @UseGuards(JwtAuthGuard) // Protect route with JWT
  // async logout(@Req() req: any) {
  //   const userId = req?.user?.userId;
  //   return this.UsersService.logout(userId);
  // }
}
