import { Module } from '@nestjs/common';
import { CommentResponseService } from './comment_response.service';
import { CommentResponseController } from './comment_response.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentResponse, CommentResponseSchema, } from './comment_response.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:CommentResponse.name, schema:CommentResponseSchema}])],
  controllers: [CommentResponseController],
  providers: [CommentResponseService],
  exports: [CommentResponseService]
})
export class CommentResponseModule {}
