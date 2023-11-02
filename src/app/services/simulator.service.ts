import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { simulator } from './mock/simulator.mock';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  headers = new HttpHeaders();
  mock = 0;
  constructor(private http: HttpClient) {


  }

  send(datos: any): Observable<any> {
    if (this.mock == 0) {
      this.headers.append("Content-Type", "application/json");
      const token = localStorage.getItem('token') || '{}';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(environment.URL + environment.PATH_SIMULATOR, datos, { headers });
    } else {
      const miObservable: Observable<any> = of(simulator);

      return miObservable;
    }

  }
}


