import { TestBed } from '@angular/core/testing';

import { OrquideaService } from './orquidea.service';

describe('OrquideaService', () => {
  let service: OrquideaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrquideaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
