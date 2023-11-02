import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mock = 0;


  constructor(private http: HttpClient) { }

  auth(): Observable<any> {
    if (this.mock == 0) {
      return this.http.post(environment.URL + environment.PATH_AUTH, environment.KEYS);
    } else {
      const miObservable: Observable<any> = of({ access_token: "AAA" });

      return miObservable;
    }
  }
}


