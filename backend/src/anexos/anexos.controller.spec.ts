import { Test, TestingModule } from '@nestjs/testing';
import { AnexosController } from './anexos.controller';

describe('AnexosController', () => {
  let controller: AnexosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnexosController],
    }).compile();

    controller = module.get<AnexosController>(AnexosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
