/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UClassifyPlayComponent } from './u-classify-play.component';

describe('UClassifyPlayComponent', () => {
  let component: UClassifyPlayComponent;
  let fixture: ComponentFixture<UClassifyPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UClassifyPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UClassifyPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
