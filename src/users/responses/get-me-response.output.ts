import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users.model';


@ObjectType()
export class GetMeResponse {
  @Field(() => User)
  user: User;

  @Field()
  message: string;
}