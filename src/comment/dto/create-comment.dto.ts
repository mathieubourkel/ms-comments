import { RefEnum } from '../enum/ref.enum';
import { StatusEnum } from '../enum/status.enum';
import {
  IsArray,
  IsEnum, IsObject,
  IsOptional, IsString, Length,
  Max, MaxLength,
} from 'class-validator';

export class CreateCommentDto {

  @IsEnum(RefEnum)
  @Max(2)
  ref: RefEnum;

  @IsString()
  refId:string;

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
