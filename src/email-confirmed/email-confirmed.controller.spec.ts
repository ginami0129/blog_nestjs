import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmedController } from './email-confirmed.controller';
import { EmailConfirmedService } from './email-confirmed.service';

describe('EmailConfirmedController', () => {
  let controller: EmailConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfirmedController],
      providers: [EmailConfirmedService],
    }).compile();

    controller = module.get<EmailConfirmedController>(EmailConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
