import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageOutput {
  @Field()
  message: string;
}