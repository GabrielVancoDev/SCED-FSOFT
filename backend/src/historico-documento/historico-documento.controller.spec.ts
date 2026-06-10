import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoDocumentoController } from './historico-documento.controller';

describe('HistoricoDocumentoController', () => {
  let controller: HistoricoDocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricoDocumentoController],
    }).compile();

    controller = module.get<HistoricoDocumentoController>(HistoricoDocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
