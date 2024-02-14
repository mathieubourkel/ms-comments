import { RefEnum } from '../enum/ref.enum';
import { StatusEnum } from '../enum/status.enum';
import {
  IsArray,
  IsEnum,
  IsMongoId, IsOptional, IsString, Length,
  Max, MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {

  @IsEnum(RefEnum)
  @Max(2)
  ref: RefEnum;

  @IsString()
  refId:string;

  // @IsMongoId()
  // refId: Types.ObjectId;

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
