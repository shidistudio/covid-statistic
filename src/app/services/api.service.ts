import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Continent } from '../interfaces/continent';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static baseUrl : String = "https://disease.sh/v3/covid-19";

  constructor(private http: HttpClient) {
    
  }

  /** GET heroes from the server */
  public getDataCountries(): Observable<Country[]> {
    return this.http.get<Country[]>("countries");
  }
  /** GET heroes from the server */
  public getDataContinets(): Observable<Continent[]> {
    return this.http.get<Continent[]>("continents");
  }

  /** GET heroes from the server */
  public getDataContinet(continent: String): Observable<Continent[]> {
    return this.http.get<Continent[]>(`continents/${continent}`);
  }
}
