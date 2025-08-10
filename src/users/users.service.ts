import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { TokenService } from 'src/common/token.service';
import { RegisterUserInput } from './inputs/register-user.input';
import { LoginUserInput } from './inputs/login-user.input';
import { ChangePasswordInput } from './inputs/change-password.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
  ) {}

 async registerUser(input: RegisterUserInput): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({ email: input.email }).exec();

    if (existingUser) {
      const message = 'Email already in use';
      throw new UnauthorizedException(message);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const createdUser = new this.userModel({
      ...input,
      password: hashedPassword,
      isEmailVerified: true,
    });

    await createdUser.save();

    const message = 'User registered successfully';
    return { message };
  }

    async loginUser(
    input: LoginUserInput,
  ): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
    message: string;
  }> {
    const user = await this.userModel.findOne({ email: input.email }).exec();

    if (!user) {
      const message = 'Invalid credentials';
      throw new UnauthorizedException(message);
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);

    if (!passwordMatches) {
      const message = 'Invalid credentials';
      throw new UnauthorizedException(message);
    }

    const jti = this.tokenService.generateJti();

    const accessTokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.tokenService.createAccessToken(accessTokenPayload, jti);

    const refreshTokenPayload = {
      sub: user.id,
    };

    const refreshToken = this.tokenService.createRefreshToken(refreshTokenPayload, jti);

    const message = 'Login successful';
    user.lastLoggedIn = new Date();
    user.loggedInTimes += 1;
    await user.save();

    const userObj = user.toObject();

    return { user: userObj, accessToken, refreshToken, message };
  }

    async getMeUser(userId: string): Promise<{ user: User; message: string }> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      const message = 'User not found';
      throw new NotFoundException(message);
    }

    const message = 'User retrieved successfully';

    const userObj = user.toObject();

    return { user: userObj, message };
  }

    async changePassword(
    userId: string,
    input: ChangePasswordInput,
  ): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      const message = 'User not found';
      throw new NotFoundException(message);
    }

    const passwordMatches = await bcrypt.compare(input.currentPassword, user.password);

    if (!passwordMatches) {
      const message = 'Current password is incorrect';
      throw new UnauthorizedException(message);
    }

    const hashedNewPassword = await bcrypt.hash(input.newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    const message = 'Password changed successfully';

    return { message };
  }

}
