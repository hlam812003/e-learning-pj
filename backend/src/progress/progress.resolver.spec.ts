import { Test, TestingModule } from '@nestjs/testing';
import { ProgressResolver } from './progress.resolver';

describe('ProgressResolver', () => {
  let resolver: ProgressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressResolver],
    }).compile();

    resolver = module.get<ProgressResolver>(ProgressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
