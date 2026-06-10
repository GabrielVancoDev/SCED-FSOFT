import { Test, TestingModule } from '@nestjs/testing';
import { StatusDocumentoService } from './status-documento.service';

describe('StatusDocumentoService', () => {
  let service: StatusDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusDocumentoService],
    }).compile();

    service = module.get<StatusDocumentoService>(StatusDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
