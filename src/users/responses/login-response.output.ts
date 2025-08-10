import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users.model';


@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  message: string;
}