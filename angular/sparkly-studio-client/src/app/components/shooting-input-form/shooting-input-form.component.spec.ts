import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingInputFormComponent } from './shooting-input-form.component';

describe('ShootingInputFormComponent', () => {
  let component: ShootingInputFormComponent;
  let fixture: ComponentFixture<ShootingInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShootingInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
