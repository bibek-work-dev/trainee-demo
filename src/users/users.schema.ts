import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';



@ObjectType() // For GraphQL
@Schema({ timestamps: true }) // createdAt & updatedAt will be stored automatically
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field()
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ default: true })
  isEmailVerified: boolean;

  @Field({ nullable: true })
  @Prop()
  avatar?: string;

  @Field({ nullable: true })
  @Prop()
  country?: string;

  @Field({ nullable: true })
  @Prop()
  countryCode?: string;

  @Field({ nullable: true })
  @Prop()
  phone?: string;

  @Field({ nullable: true })
  @Prop()
  fullPhoneNumber?: string;

  @Field({ nullable: true })
  @Prop()
  lastLoggedIn?: Date;

  @Field()
  @Prop({ default: 0 })
  loggedInTimes: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
