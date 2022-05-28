import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmedService } from './email-confirmed.service';

describe('EmailConfirmedService', () => {
  let service: EmailConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConfirmedService],
    }).compile();

    service = module.get<EmailConfirmedService>(EmailConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
