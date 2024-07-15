import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HtmlServiceService {

  constructor(private http: HttpClient) { }

  getHtml() {
    let httpHeaders =  new HttpHeaders({
      Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    });

    return this.http.get('https://iplpredictor.z13.web.core.windows.net/', {responseType: 'text'})
  }
}
