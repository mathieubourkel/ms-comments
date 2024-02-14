import { Controller, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './comment.schema';
import { _catchEx, _Ex } from '../../exceptions/RcpExceptionFormated';
import { RefEnum } from './enum/ref.enum';
import { RefEnumKeys } from './type/refEnumKeys.type';
import { MessagePattern, Payload, } from '@nestjs/microservices';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @Post('/comment')
  @MessagePattern('POST_COMMENT')
  async create(
    @Payload(new ValidationPipe()) body: CreateCommentDto) :Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.create(body);
      if (!comment) _Ex("COMMENT CREATION FAILED", 400, "CC-BUILD-FAILED", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Get('/comment/:id')
  @MessagePattern('GET_COMMENT')
  async findCommentById(@Payload('id') id: string): Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.getCommentById(id);
      if (!comment) _Ex("COMMENT DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Get('/comments/:ref/:refId')
  @MessagePattern('GET_COMMENT_BY_REF')
  async findCommentByRef(@Payload() params : {refKey: RefEnumKeys,refId: string}) : Promise<CommentDocument[]> {
    try {
      const comments:CommentDocument[] =  await this.commentService.getCommentByRef(RefEnum[params.refKey], params.refId);
      if (!comments || comments.length === 0) _Ex("COMMENTS DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comments;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Patch('/comment/:id')
  @MessagePattern('PATCH_COMMENT')
  async update(@Payload('id') id: string, @Payload('body', new ValidationPipe()) body: UpdateCommentDto):Promise<Partial<CommentDocument>> {
    try {
      const comment:Partial<CommentDocument> = await this.commentService.update(id, body);
      if (!comment) _Ex("UPDATE FAILED", 400, "CC-COM-NOTUP", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  // @Delete('/comment/:id')
  @MessagePattern('DELETE_COMMENT')
  delete(@Payload('id') id: string):Promise<CommentDocument> {
    const comment:Promise<CommentDocument> = this.commentService.delete(id);
    if (!comment) _Ex("DELETE FAILED", 403, "CC-NO-DELETE", "/" );
    return comment;
  }
}