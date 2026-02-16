import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {


  private apiUrl = environment.apiUrl + 'Translate';

  constructor(private http: HttpClient) { }


  getTranslation(text: string): Observable<string> {
    return this.http.get<string>(this.apiUrl + `?text=${encodeURIComponent(text)}`);
  }
}
