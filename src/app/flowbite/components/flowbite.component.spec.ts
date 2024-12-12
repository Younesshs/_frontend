import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowbiteComponent } from './flowbite.component';

describe('FlowbiteComponent', () => {
  let component: FlowbiteComponent;
  let fixture: ComponentFixture<FlowbiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowbiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowbiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
