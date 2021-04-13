import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root'
})
export class CurrentPhoneService {

  private source = new BehaviorSubject(null);
  currentPhone = this.source.asObservable();

  constructor() { }

  changeCurrentPhone(phone: Phone) {
    this.source.next(phone);
  }
}
