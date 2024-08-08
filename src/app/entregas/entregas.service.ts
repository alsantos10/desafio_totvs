import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Entrega } from './entregas.interface';

const URL_API = './api/entregas.json';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private http: HttpClient) {}

  getEntregas(): Observable<Array<Entrega>> {
    return this.http.get<Array<Entrega>>(URL_API);
  }
}
