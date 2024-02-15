import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from './comment.schema';
import { RefEnum } from './enum/ref.enum';
import {
  BaseUtils
} from '../../libs/base/base.utils';

@Injectable()
export class CommentService extends BaseUtils {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>
  ) {
    super()
  }

  async create(body: CreateCommentDto):Promise<CommentDocument> {
    try {
      const project = new this.commentModel(body);
      return await project.save();
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getCommentById(_id: string): Promise<CommentDocument> {
    try {
      return await this.commentModel.findOne({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }

  async getCommentByRef(ref:RefEnum, refId: string): Promise<CommentDocument[]> {
    try {
      return await this.commentModel.find({ref: ref, refId: refId});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async update(_id: string, body: UpdateCommentDto): Promise<Partial<CommentDocument>> {
    try {
      // @ts-ignore
      return await this.commentModel.findOneAndUpdate({ _id }, body, {new : true});
    } catch (error) {
      this._catchEx(error)
    }
  }

  async delete(_id: string):Promise<CommentDocument> {
    try {
      return await this.commentModel.findOneAndDelete({ _id });
    } catch (error) {
      this._catchEx(error)
    }
  }
}
