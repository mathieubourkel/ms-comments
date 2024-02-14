import { Controller, ValidationPipe } from '@nestjs/common';
import { CommentResponseService } from './comment_response.service';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';
import { _catchEx, _Ex } from '../../exceptions/RcpExceptionFormated';
import { CommentResponseDocument } from './comment_response.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CommentResponseController {
  constructor(private readonly commentResponseService: CommentResponseService) {}

  @MessagePattern('POST_RESPONSE_COMMENT')
  async create(
    @Payload(new ValidationPipe()) body: CreateCommentResponseDto) :Promise<CommentResponseDocument> {
    try {
      const comment_response:CommentResponseDocument = await this.commentResponseService.create(body);
      if (!comment_response) _Ex("CREATION OF RESPONSE TO COMMENT FAILED", 400, "CRC-BUILD-FAILED", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Get('/:id')
  @MessagePattern('GET_RESPONSE_COMMENT')
  async findCommentResponseById(@Payload('id') id: string): Promise<CommentResponseDocument> {
    try {
      const comment_response:CommentResponseDocument = await this.commentResponseService.getCommentResponseById(id);
      if (!comment_response) _Ex("RESPONSE TO COMMENT DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Get('/:idComment')
  @MessagePattern('GET_RESPONSE_COMMENT_OF_COMMENT')
  async findResponseByComment(@Payload('idComment') idComment: string): Promise<CommentResponseDocument[]> {
    try {
      const comment_response:CommentResponseDocument[] =  await this.commentResponseService.getResponseByComment(idComment);
      if (!comment_response || comment_response.length === 0) _Ex("RESPONSES TO COMMENT DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Patch('/:id')
  @MessagePattern('PATCH_RESPONSE_COMMENT')
  async update(@Payload('id') id: string, @Payload(new ValidationPipe()) body: UpdateCommentResponseDto):Promise<Partial<CommentResponseDocument>> {
    try {
      const comment_response:Partial<CommentResponseDocument> = await this.commentResponseService.update(id, body);
      if (!comment_response) _Ex("UPDATE FAILED", 400, "CRC-REP-NOTUP", "/" )
      return comment_response;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Delete('/:id')
  @MessagePattern('DELETE_RESPONSE_COMMENT')
  delete(@Payload('id') id: string):Promise<CommentResponseDocument> {
    const comment_response:Promise<CommentResponseDocument> = this.commentResponseService.delete(id);
    if (!comment_response) _Ex("DELETE FAILED", 403, "CRC-NO-DELETE", "/" );
    return comment_response;
  }
}
