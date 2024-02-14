import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  CommentService,
} from './comment.service';
import {
  CreateCommentDto,
} from './dto/create-comment.dto';
import {
  UpdateCommentDto,
} from './dto/update-comment.dto';
import {
  CommentDocument,
} from './comment.schema';
import {
  _catchEx,
  _Ex,
} from '../../exceptions/RcpExceptionFormated';
import { RefEnum } from './enum/ref.enum';

type RefEnumKeys = keyof typeof RefEnum

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/comment')
  async create(
    @Body(new ValidationPipe()) body: CreateCommentDto) :Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.create(body);
      if (!comment) _Ex("COMMENT CREATION FAILED", 400, "CC-BUILD-FAILED", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/comment/:id')
  async findCommentById(@Param('id') id: string): Promise<CommentDocument> {
    try {
      const comment:CommentDocument = await this.commentService.getCommentById(id);
      if (!comment) _Ex("COMMENT DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Get('/comments/:ref/:refId')
  async findCommentByRef(@Param('ref') refKey: RefEnumKeys, @Param('refId') refId: string): Promise<CommentDocument[]> {
    try {
      const comments:CommentDocument[] =  await this.commentService.getCommentByRef(RefEnum[refKey], refId);
      if (!comments || comments.length === 0) _Ex("COMMENTS DON'T EXIST", 404, "CC-NO-EXIST", "/" )
      return comments;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Patch('/comment/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentDto):Promise<Partial<CommentDocument>> {
    try {
      const comment:Partial<CommentDocument> = await this.commentService.update(id, body);
      if (!comment) _Ex("UPDATE FAILED", 400, "CC-COM-NOTUP", "/" )
      return comment;
    } catch (error) {
      _catchEx(error)
    }
  }

  @Delete('/comment/:id')
  delete(@Param('id') id: string):Promise<CommentDocument> {
    const comment:Promise<CommentDocument> = this.commentService.delete(id);
    if (!comment) _Ex("DELETE FAILED", 403, "CC-NO-DELETE", "/" );
    return comment;
  }
}