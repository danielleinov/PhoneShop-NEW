import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Phone } from 'src/app/models/phone';
import { PhonesService } from 'src/app/services/phones.service';
import { CurrentPhoneService } from 'src/app/services/current-phone.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  phone: Phone;
  subscription: Subscription;

  constructor(private phonesService: PhonesService,
              private currentPhoneService: CurrentPhoneService) { }

  ngOnInit() {
    this.subscription = this.currentPhoneService.currentPhone.subscribe(phone => this.phone = phone);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.phonesService.deletePhone(this.phone._id).subscribe(() => {
      this.phone = null;
    });
  }

  onRefresh(){
    this.phonesService.getPhone(this.phone._id).subscribe(phone => {
      this.phone = phone;
    });
  }

  onUpdate(){
    this.phonesService.updatePhone(this.phone).subscribe(phone => {
      this.phone = phone;
    });
  }
}
