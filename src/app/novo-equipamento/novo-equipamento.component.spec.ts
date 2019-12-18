import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEquipamentoComponent } from './novo-equipamento.component';

describe('NovoEquipamentoComponent', () => {
  let component: NovoEquipamentoComponent;
  let fixture: ComponentFixture<NovoEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
