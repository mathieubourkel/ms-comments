import { Test, TestingModule } from '@nestjs/testing';
import { CommentResponseController } from './comment_response.controller';
import { CommentResponseService } from './comment_response.service';

describe('CommentResponseController', () => {
  let controller: CommentResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentResponseController],
      providers: [CommentResponseService],
    }).compile();

    controller = module.get<CommentResponseController>(CommentResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
