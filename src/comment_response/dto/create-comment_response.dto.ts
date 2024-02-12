import {
  IsArray,
  IsEnum,
  IsMongoId, IsOptional,
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
  @Length(10, 500)
  content: string;

  @IsString()
  @Length(1, 50)
  author: string;

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
