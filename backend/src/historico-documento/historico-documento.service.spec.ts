import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoDocumentoService } from './historico-documento.service';

describe('HistoricoDocumentoService', () => {
  let service: HistoricoDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoDocumentoService],
    }).compile();

    service = module.get<HistoricoDocumentoService>(HistoricoDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
