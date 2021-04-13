import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Phone} from '../models/phone';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {
  private phonesUrl = environment.phonesUrl;

  constructor(private http: HttpClient) {
  }

  getPhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.phonesUrl);
  }

  addPhone(displayName: string, description: string, price: number, discount: number): Observable<Phone> {
    return this.http.post<Phone>(this.phonesUrl, {
      displayName: displayName,
      description: description,
      price: price,
      discount: discount
    });
  }

  getPhone(id: string): Observable<Phone> {
    const url = `${this.phonesUrl}/${id}`;
    return this.http.get<Phone>(url);
  }

  updatePhone(phone: Phone): Observable<Phone> {
    const url = `${this.phonesUrl}/${phone._id}`;
    return this.http.patch<Phone>(url, {displayName: phone.displayName});
  }

  deletePhone(id: string): Observable<Phone> {
    const url = `${this.phonesUrl}/${id}`;
    return this.http.delete<Phone>(url);
  }

  scrape(): Observable<any> {
    const url = `${this.phonesUrl}/scrape`;
    return this.http.get(url);
  }
}
