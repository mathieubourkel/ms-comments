import { Injectable } from '@nestjs/common';
import { CreateCommentResponseDto } from './dto/create-comment_response.dto';
import { UpdateCommentResponseDto } from './dto/update-comment_response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentResponse, CommentResponseDocument, } from './comment_response.schema';
import {
  BaseUtils
} from '../../libs/base/base.utils';

@Injectable()
export class CommentResponseService extends BaseUtils {
  constructor(
    @InjectModel(CommentResponse.name)
    private commentResponseModel: Model<CommentResponseDocument>
  ) {
    super()
  }

  async create(body: CreateCommentResponseDto):Promise<CommentResponseDocument> {
    try {
      const comment_response = new this.commentResponseModel(body);
      return await comment_response.save();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getCommentResponseById(_id: string): Promise<CommentResponseDocument> {
    try {
      return await this.commentResponseModel.findOne({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getResponseByComment(id: string): Promise<CommentResponseDocument[]> {
    try {
      return await this.commentResponseModel.find({id: id});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async update(_id: string, body: UpdateCommentResponseDto): Promise<Partial<CommentResponseDocument>> {
    try {
      // @ts-ignore
      return await this.commentResponseModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async delete(_id: string):Promise<CommentResponseDocument> {
    try {
      return await this.commentResponseModel.findOneAndDelete({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }
}
