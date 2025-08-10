import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.model';
import { RegisterUserInput } from './inputs/register-user.input';
import { MessageOutput } from './responses/message-response.output';
import { LoginResponse } from './responses/login-response.output';
import { LoginUserInput } from './inputs/login-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @Mutation(() => MessageOutput)
  async registerUser(@Args('input') input: RegisterUserInput): Promise<MessageOutput> {
    const result = await this.usersService.registerUser(input);
    return result;
  }


  @Mutation(() => LoginResponse)
  async loginUser(@Args('input') input: LoginUserInput): Promise<LoginResponse> {
    const result = await this.usersService.loginUser(input);
    return result;
  }
  
}
