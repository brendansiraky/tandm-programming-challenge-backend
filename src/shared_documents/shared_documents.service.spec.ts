import { Test, TestingModule } from '@nestjs/testing';
import { SharedDocumentsService } from './shared_documents.service';

describe('SharedDocumentsService', () => {
  let service: SharedDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedDocumentsService],
    }).compile();

    service = module.get<SharedDocumentsService>(SharedDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
