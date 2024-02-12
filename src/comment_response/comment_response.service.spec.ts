import { Test, TestingModule } from '@nestjs/testing';
import { CommentResponseService } from './comment_response.service';

describe('CommentResponseService', () => {
  let service: CommentResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentResponseService],
    }).compile();

    service = module.get<CommentResponseService>(CommentResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
