import { Component } from '@angular/core';
import { Phone } from 'src/app/models/phone';
import { PhonesService } from 'src/app/services/phones.service';
import { CurrentPhoneService } from 'src/app/services/current-phone.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  phones : Phone[] = [];

  constructor(private phonesService : PhonesService,
              private currentPhoneService: CurrentPhoneService){}

  ngOnInit() {
    this.load();
  }

  load(){
    this.phonesService.getPhones().subscribe(data => {
      this.phones = data;
    });
  }

  onClick(phone : Phone){
    this.currentPhoneService.changeCurrentPhone(phone);
  }

  handlePanel(action : string){
    this.load();
  }
}
