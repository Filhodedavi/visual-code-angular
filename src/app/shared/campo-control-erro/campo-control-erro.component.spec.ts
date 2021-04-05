import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlComponent } from './campo-control-erro.component';

describe('CampoControlComponent', () => {
  let component: CampoControlComponent;
  let fixture: ComponentFixture<CampoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
