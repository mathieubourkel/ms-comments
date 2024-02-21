import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusEnum } from './enum/status.enum';
import { Types } from 'mongoose';

export type CommentResponseDocument = CommentResponse & Document;

@Schema({ collection: 'comment_response', timestamps: true })
export class CommentResponse {

  @Prop({ type: Types.ObjectId, ref:'comment'})
  commentId: Types.ObjectId;

  @Prop({required: true})
  content: string;

  @Prop({ type: { id: String, username: String }, required: true })
  author: { id: string, username: string };

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.PENDING })
  status: StatusEnum;

  @Prop()
  medias: string[]
}

export const CommentResponseSchema = SchemaFactory.createForClass(CommentResponse)

