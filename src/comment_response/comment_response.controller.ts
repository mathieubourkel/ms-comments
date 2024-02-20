import { Controller, ValidationPipe } from '@nestjs/common';
import { CommentResponseService } from './comment_response.service';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';
import { CommentResponseDocument } from './comment_response.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BaseUtils } from '../../libs/base/base.utils';

@Controller()
export class CommentResponseController extends BaseUtils {
  constructor(private readonly commentResponseService: CommentResponseService) {
    super()
  }

  @MessagePattern('POST_RESPONSE_COMMENT')
  async create(
    @Payload(new ValidationPipe()) body: CreateCommentResponseDto) :Promise<CommentResponseDocument> {
    try {
      const comment_response:CommentResponseDocument = await this.commentResponseService.create(body);
      if (!comment_response) this._Ex("CREATION OF RESPONSE TO COMMENT FAILED", 400, "CRC-BUILD-FAILED", "/" )
      return comment_response;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Get('/:id')
  @MessagePattern('GET_RESPONSE_COMMENT')
  async findCommentResponseById(@Payload() id: string): Promise<CommentResponseDocument> {
    try {
      console.log(id)
      const comment_response:CommentResponseDocument = await this.commentResponseService.getCommentResponseById(id);
      if (!comment_response) this._Ex("RESPONSE DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Get('/:idComment')
  @MessagePattern('GET_RESPONSE_OF_COMMENT')
  async findResponseByComment(@Payload('idComment') idComment: string): Promise<CommentResponseDocument[]> {
    try {
      const comment_response:CommentResponseDocument[] =  await this.commentResponseService.getResponseByComment(idComment);
      if (!comment_response || comment_response.length === 0) this._Ex("RESPONSES TO COMMENT DON'T EXIST", 404, "CRC-NO-EXIST", "/" )
      return comment_response;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Patch('/:id')
  @MessagePattern('PATCH_RESPONSE_COMMENT')
  async update(@Payload('id') id: string, @Payload('body', new ValidationPipe()) body: UpdateCommentResponseDto):Promise<Partial<CommentResponseDocument>> {
    try {
      const comment_response:Partial<CommentResponseDocument> = await this.commentResponseService.update(id, body);
      if (!comment_response) this._Ex("UPDATE FAILED", 400, "CRC-REP-NOTUP", "/" )
      return comment_response;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Delete('/:id')
  @MessagePattern('DELETE_RESPONSE_COMMENT')
  delete(@Payload() id: string):Promise<CommentResponseDocument> {
    const comment_response:Promise<CommentResponseDocument> = this.commentResponseService.delete(id);
    if (!comment_response) this._Ex("DELETE FAILED", 403, "CRC-NO-DELETE", "/" );
    return comment_response;
  }
}
