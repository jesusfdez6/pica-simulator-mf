import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { SimulatorService } from './simulator.service';
import { simulator } from './mock/simulator.mock';

describe('SimulatorService', () => {
  let service: SimulatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [SimulatorService]
    });
    service = TestBed.inject(SimulatorService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to simulator', () => {
    const expectedResponse = simulator;
    service.mock = 0;
    const datos = {
      loanTotal: 100000,
      termUnit: 5,
      term: "Year",
      simulationGuid: "58229058359258",

    }
    service.send(datos).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
    const req = httpTestingController.expectOne(environment.URL + environment.PATH_SIMULATOR);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
    httpTestingController.verify();
  });

  it('should make an HTTP POST request to simulator', () => {
    const expectedResponse = simulator;
    const datos = {
      loanTotal: 100000,
      termUnit: 5,
      term: "Year",
      simulationGuid: "58229058359258",

    }
    service.send(datos).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });

});
