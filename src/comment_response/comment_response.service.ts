import { Injectable } from '@nestjs/common';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _catchEx } from '../../exceptions/RcpExceptionFormated';
import { CommentResponse, CommentResponseDocument, } from './comment_response.schema';

@Injectable()
export class CommentResponseService {
  constructor(
    @InjectModel(CommentResponse.name)
    private commentResponseModel: Model<CommentResponseDocument>
  ) {}

  async create(body: CreateCommentResponseDto):Promise<CommentResponseDocument> {
    try {
      const comment_response = new this.commentResponseModel(body);
      return await comment_response.save();
    } catch (error) {
      _catchEx(error)
    }
  }

  async getCommentResponseById(_id: string): Promise<CommentResponseDocument> {
    try {
      return await this.commentResponseModel.findOne({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }

  async getResponseByComment(id: string): Promise<CommentResponseDocument[]> {
    try {
      return await this.commentResponseModel.find({id: id});
    } catch (error) {
      _catchEx(error)
    }
  }

  async update(_id: string, body: UpdateCommentResponseDto): Promise<Partial<CommentResponseDocument>> {
    try {
      // @ts-ignore
      return await this.commentResponseModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      _catchEx(error)
    }
  }

  async delete(_id: string):Promise<CommentResponseDocument> {
    try {
      return await this.commentResponseModel.findOneAndDelete({ _id });
    } catch (error) {
      _catchEx(error)
    }
  }
}
