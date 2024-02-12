import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './comment/comment.module';
import { CommentResponseModule } from './comment_response/comment_response.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,}),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DNS}`,
                           {dbName : "db-chappy-comment"}),
    CommentModule,
    CommentResponseModule,
  ]
})
export class AppModule {}
