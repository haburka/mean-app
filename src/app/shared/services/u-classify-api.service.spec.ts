/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UClassifyAPIService } from './u-classify-api.service';

describe('UClassifyAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UClassifyAPIService]
    });
  });

  it('should ...', inject([UClassifyAPIService], (service: UClassifyAPIService) => {
    expect(service).toBeTruthy();
  }));
});
