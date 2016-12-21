/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FbPlayComponent } from './fb-play.component';

describe('FbPlayComponent', () => {
  let component: FbPlayComponent;
  let fixture: ComponentFixture<FbPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
