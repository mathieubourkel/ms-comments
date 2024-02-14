import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CommentResponseService } from './comment_response.service';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';
import { _catchEx, _Ex } from '../../exceptions/RcpExceptionFormated';
import { CommentResponseDocument } from './comment_response.schema';

@Controller('comment-response')
export class CommentResponseController {
  constructor(private readonly commentResponseService: CommentResponseService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) body: CreateCommentResponseDto) :Promise<CommentResponseDocument> {
    try {
      const comment_response:CommentResponseDocument = await this.commentResponseService.create(body);
      if (!comment_response) _Ex("CREATION OF RESPONSE TO COMMENT FAILED", 400, "CRC-BUILD-FAILED", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/:id')
  async findCommentResponseById(@Param('id') id: string): Promise<CommentResponseDocument> {
    try {
      const comment_response:CommentResponseDocument = await this.commentResponseService.getCommentResponseById(id);
      if (!comment_response) _Ex("RESPONSE TO COMMENT DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/:idComment')
  async findResponseByComment(@Param('idComment') idComment: string): Promise<CommentResponseDocument[]> {
    try {
      const comment_response:CommentResponseDocument[] =  await this.commentResponseService.getResponseByComment(idComment);
      if (!comment_response || comment_response.length === 0) _Ex("RESPONSES TO COMMENT DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentResponseDto):Promise<Partial<CommentResponseDocument>> {
    try {
      const comment_response:Partial<CommentResponseDocument> = await this.commentResponseService.update(id, body);
      if (!comment_response) _Ex("UPDATE FAILED", 400, "CRC-REP-NOTUP", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: string):Promise<CommentResponseDocument> {
    const comment_response:Promise<CommentResponseDocument> = this.commentResponseService.delete(id);
    if (!comment_response) _Ex("DELETE FAILED", 403, "CRC-NO-DELETE", "/" );
    return comment_response;
  }
}
