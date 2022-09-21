import { Test, TestingModule } from '@nestjs/testing';
import { SharedDocumentsController } from './shared_documents.controller';

describe('SharedDocumentsController', () => {
  let controller: SharedDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedDocumentsController],
    }).compile();

    controller = module.get<SharedDocumentsController>(SharedDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
