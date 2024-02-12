import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentResponseDto } from './create-comment_response.dto';
import { IsEnum, IsString, Length, Max } from 'class-validator';
import { StatusEnum } from '../../comment/enum/status.enum';

export class UpdateCommentResponseDto extends PartialType(CreateCommentResponseDto) {

  @IsString()
  @Length(10, 500)
  content: string;

  @IsEnum(StatusEnum)
  @Max(2)
  status: StatusEnum;


}
