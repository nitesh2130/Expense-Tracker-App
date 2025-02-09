import { LoginDto } from './DTO/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from './DTO/register.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { promises } from 'dns';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly UserModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  //register service for the user
  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    console.log(name, ' this is name');
    console.log(email, ' this is email');
    console.log(password, ' this is password');
    if (!name || !email || !password) {
      throw new BadRequestException('All feild are required');
    }

    //check the email of user already exist or not
    const emailExist = await this.UserModel.findOne({
      where: { email: email },
    });
    // console.log(emailExist);
    if (emailExist) {
      throw new BadRequestException('email is already exist');
    }

    //save the user in the DataBase
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    const userOnce = await this.UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    } as unknown as User);

    console.log(userOnce, 'this is created user');

    return { message: 'User is SuccessFully registerd' };
  }

  //Login service for the user

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    //Check the user is Exist or not
    const user = await this.UserModel.findOne({ where: { email: email } });
    if (!user) {
      throw new BadRequestException('email is invalid');
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('password is not match');
    }

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'backend';
    const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || '1d';

    const access_token = await this.jwtService.signAsync(
      {
        email: user.email,
        userId: user.id,
      },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRE,
      },
    );

    // const { password, ...userDetails } = user;
    return { access_token, user, message: 'user is login successfully' };
  }
}
