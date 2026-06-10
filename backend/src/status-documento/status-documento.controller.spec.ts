import { Test, TestingModule } from '@nestjs/testing';
import { StatusDocumentoController } from './status-documento.controller';

describe('StatusDocumentoController', () => {
  let controller: StatusDocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusDocumentoController],
    }).compile();

    controller = module.get<StatusDocumentoController>(StatusDocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
