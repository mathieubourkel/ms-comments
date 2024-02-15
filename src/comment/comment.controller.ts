import { Controller, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './comment.schema';
import { RefEnum } from './enum/ref.enum';
import { RefEnumKeys } from './type/refEnumKeys.type';
import { MessagePattern, Payload, } from '@nestjs/microservices';
import { BaseUtils } from '../../libs/base/base.utils';

@Controller()
export class CommentController extends BaseUtils {
  constructor(private readonly commentService: CommentService) {
    super()
  }

  // @Post('/comment')
  @MessagePattern('POST_COMMENT')
  async create(
    @Payload(new ValidationPipe()) body: CreateCommentDto) :Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.create(body);
      if (!comment) this._Ex("COMMENT CREATION FAILED", 400, "CC-BUILD-FAILED", "/" )
      return comment;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Get('/comment/:id')
  @MessagePattern('GET_COMMENT')
  async findCommentById(@Payload() id: string): Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.getCommentById(id);
      if (!comment) this._Ex("COMMENT DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comment;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Get('/comments/:ref/:refId')
  @MessagePattern('GET_COMMENT_BY_REF')
  async findCommentByRef(@Payload() params : {refKey: RefEnumKeys,refId: string}) : Promise<CommentDocument[]> {
    try {
      const comments:CommentDocument[] =  await this.commentService.getCommentByRef(RefEnum[params.refKey], params.refId);
      if (!comments || comments.length === 0) this._Ex("COMMENTS DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comments;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Patch('/comment/:id')
  @MessagePattern('PATCH_COMMENT')
  async update(@Payload() id: string, @Payload('body', new ValidationPipe()) body: UpdateCommentDto):Promise<Partial<CommentDocument>> {
    try {
      const comment:Partial<CommentDocument> = await this.commentService.update(id, body);
      if (!comment) this._Ex("UPDATE FAILED", 400, "CC-COM-NOTUP", "/" )
      return comment;
    } catch (error) {
      this._catchEx(error)
    }
  }

  // @Delete('/comment/:id')
  @MessagePattern('DELETE_COMMENT')
  delete(@Payload() id: string):Promise<CommentDocument> {
    const comment:Promise<CommentDocument> = this.commentService.delete(id);
    if (!comment) this._Ex("DELETE FAILED", 403, "CC-NO-DELETE", "/" );
    return comment;
  }
}