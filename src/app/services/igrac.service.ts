import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGRAC_URL, IGRAC_URL_ZA_TIM } from '../constants';
import { Igrac } from '../models/igrac';

@Injectable({
  providedIn: 'root'
})
export class IgracService {

  constructor(private httpClient: HttpClient) { }

  public getAllIgraciZaTimID(idTim: number): Observable<any> {
    return this.httpClient.get(`${IGRAC_URL_ZA_TIM}/${idTim}`);
  }

  public addIgrac(igrac: Igrac): Observable<any> {
    //da ne bi bilo greske, posle u bazi sekvenca vodi racuna o vrednosti id-ja
    igrac.id = 150;
    return this.httpClient.post(`${IGRAC_URL}`, igrac);
  }

  public updateIgrac(igrac: Igrac): Observable<any> {
    return this.httpClient.put(`${IGRAC_URL}`, igrac);
  }

  public deleteIgrac(id: number): Observable<any> {
    //${id} - referenciramo id iz parametra methode
    return this.httpClient.delete(`${IGRAC_URL}/${id}`);
  }
}
