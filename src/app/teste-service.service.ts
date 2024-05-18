import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TesteServiceService {

  private apiUrl = 'http://localhost:8100/api/text';

  constructor(private http: HttpClient) { }

  getText(): Observable<any> {
    return this.http.get(this.apiUrl);

  }

  updateText(newText: string): Observable<any> {
    return this.http.post(this.apiUrl, { text: newText })
  }
}
