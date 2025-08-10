import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql')
    }),
     MongooseModule.forRootAsync({
      imports: [ConfigModule],  // import ConfigModule here
      inject: [ConfigService],  // inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        
        uri: configService.get<string>('DATABASE_URI'), 
      }),
    }),
    UsersModule,
    EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
