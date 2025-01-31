import { TestBed } from '@angular/core/testing';

import { TogetherAiService } from './together-ai.service';

describe('TogetherAiService', () => {
  let service: TogetherAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogetherAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
