import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';



describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [AuthService]

    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request to authenticate', () => {
    const expectedResponse = { access_token: "AAA" };
    service.mock = 0;
    service.auth().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
    const req = httpTestingController.expectOne(environment.URL + environment.PATH_AUTH);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
    httpTestingController.verify();
  });
  it('should make an HTTP POST request to authenticate', () => {
    const expectedResponse = { access_token: "AAA" };
    service.auth().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });
});
