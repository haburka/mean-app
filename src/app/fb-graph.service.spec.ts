/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FbGraphService } from './fb-graph.service';

describe('FbGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbGraphService]
    });
  });

  it('should ...', inject([FbGraphService], (service: FbGraphService) => {
    expect(service).toBeTruthy();
  }));
});
