import {
  IsArray,
  IsEnum,
  IsMongoId, IsObject, IsOptional,
  IsString, Length, Max, MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  StatusEnum
} from '../../comment/enum/status.enum';

export class CreateCommentResponseDto {

  @IsMongoId()
  commentId: Types.ObjectId;

  @IsString()
  @Length(2, 500)
  content: string;

  @IsObject()
  author: { id: string, username: string };

  @IsEnum(StatusEnum)
  @Max(2)
  status: StatusEnum;

  @IsArray()
  @MaxLength(20, {
    each: true,
  })
  @IsOptional()
  medias:string[]

}
