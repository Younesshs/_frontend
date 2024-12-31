import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCompanyComponent } from './confirm-company.component';

describe('ConfirmCompanyComponent', () => {
  let component: ConfirmCompanyComponent;
  let fixture: ComponentFixture<ConfirmCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
