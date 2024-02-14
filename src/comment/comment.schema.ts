import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusEnum } from './enum/status.enum';
import { RefEnum } from './enum/ref.enum';
import { Types } from 'mongoose';
import { CommentResponse } from '../comment_response/comment_response.schema';

export type CommentDocument = Comment & Document;

@Schema({ collection: 'comment', timestamps: true })
export class Comment {
  @Prop({type: ()=> RefEnum, required:true })
  ref: RefEnum;

  // @Prop({ type: Types.ObjectId })
  // refId: Types.ObjectId;

  @Prop({required: true})
  refId: string;

  @Prop({required: true})
  content: string;

  @Prop({required: true})
  author: string;

  @Prop({type: ()=> StatusEnum, required:true, default: StatusEnum.PENDING })
  status: StatusEnum;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'comment_response' }] })
  responses: CommentResponse[] | Types.ObjectId[];

  @Prop()
  medias: string[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
