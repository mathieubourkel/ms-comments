import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsEnum, IsString, Length, Max } from 'class-validator';
import { StatusEnum } from '../enum/status.enum';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {

  @IsString()
  @Length(2, 500)
  content: string;

  @IsEnum(StatusEnum)
  @Max(2)
  status: StatusEnum;

}
