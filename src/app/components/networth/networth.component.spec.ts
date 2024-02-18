import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworthComponent } from './networth.component';

describe('NetworthComponent', () => {
  let component: NetworthComponent;
  let fixture: ComponentFixture<NetworthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
