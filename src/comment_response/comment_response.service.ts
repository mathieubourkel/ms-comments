import { Injectable } from '@nestjs/common';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';

@Injectable()
export class CommentResponseService {
  create(createCommentResponseDto: CreateCommentResponseDto) {
    return 'This action adds a new commentResponse';
  }

  findAll() {
    return `This action returns all commentResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentResponse`;
  }

  update(id: number, updateCommentResponseDto: UpdateCommentResponseDto) {
    return `This action updates a #${id} commentResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentResponse`;
  }
}
