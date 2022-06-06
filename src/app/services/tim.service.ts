import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIM_URL } from '../constants';
import { Tim } from '../models/tim';

@Injectable({
  providedIn: 'root'
})
export class TimService {

  constructor(private httpClient: HttpClient) { }

  public getAllTims(): Observable<any> {
    return this.httpClient.get(`${TIM_URL}`);
  }

  public addTim(tim: Tim): Observable<any> {
    //da ne bi bilo greske, posle u bazi sekvenca vodi racuna o vrednosti id-ja
    tim.id = 150;
    return this.httpClient.post(`${TIM_URL}`, tim);
  }

  public updateTim(tim: Tim): Observable<any> {
    return this.httpClient.put(`${TIM_URL}`, tim);
  }

  public deleteTim(id: number): Observable<any> {
    //${id} - referenciramo id iz parametra methode
    return this.httpClient.delete(`${TIM_URL}/${id}`);
  }
}
