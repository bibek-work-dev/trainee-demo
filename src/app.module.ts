import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
     MongooseModule.forRoot('mongodb://localhost:27017/trainee-demo'),
    UsersModule,
    EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
