import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorComponent } from './simulator.component';
import { SimulatorService } from '../services/simulator.service'
import { AuthService } from '../services/auth.service'

import { of } from 'rxjs';
import { simulator } from '../services/mock/simulator.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../material/material.module'; // Importa MatInputModule u otros módulos de Angular Material que necesites
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importa ReactiveFormsModule


describe('SimulatorComponent', () => {
  let component: SimulatorComponent;
  let fixture: ComponentFixture<SimulatorComponent>;
  let service: SimulatorService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulatorComponent],
      imports: [HttpClientTestingModule, MaterialModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [SimulatorService, AuthService]
    });
    fixture = TestBed.createComponent(SimulatorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    service = TestBed.inject(SimulatorService);
    authService = TestBed.inject(AuthService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should event simulator', () => {
    spyOn(service, 'send').and.returnValue(of(simulator))
    component.simulator.setValue({
      loanTotal: 1000,
      termUnit: 1,
      term: 'Year',
      simulationGuid: '58229058359258',
    });
    component.onSubmit();
    expect(service.send).toHaveBeenCalled();

  });

  it('Auth', () => {
    localStorage.removeItem('token');
    spyOn(authService, 'auth').and.returnValue(of({ access_token: "AAA" }));
    component.auth();
    const token = localStorage.getItem('token') || '{}';
    expect(token).toEqual("AAA");

  });

  it('getAvailableYears should return an array of numbers', () => {
    component.responseSimulator = simulator;
    const availableYears = component.getAvailableYears();
    expect(availableYears).toEqual([1, 2, 3, 4, 5]);
  });

  it('filteredPlanDetail should return the expected array', () => {
    component.selectedYear = 1; // set the selectedYear for the test
    component.responseSimulator = simulator;
    const filteredDetail = component.filteredPlanDetail;
    expect(filteredDetail.length).toEqual(12)
    // Write your expectations for the filteredPlanDetail here
  });

  it('changeYear', () => {

    const mockMatSelectChange = {
      source: {},
      value: 1
    }

    component.changeYear(mockMatSelectChange);
    expect(component.selectedYear).toEqual(1)
  });

  /*it('navigate', () => {
    component.volver();
    expect(1).toEqual(1);
  });*/

});

