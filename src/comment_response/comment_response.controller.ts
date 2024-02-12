import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentResponseService } from './comment_response.service';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';

@Controller('comment-response')
export class CommentResponseController {
  constructor(private readonly commentResponseService: CommentResponseService) {}

  @Post()
  create(@Body() createCommentResponseDto: CreateCommentResponseDto) {
    return this.commentResponseService.create(createCommentResponseDto);
  }

  @Get()
  findAll() {
    return this.commentResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentResponseDto: UpdateCommentResponseDto) {
    return this.commentResponseService.update(+id, updateCommentResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentResponseService.remove(+id);
  }
}
