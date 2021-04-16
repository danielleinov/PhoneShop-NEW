import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PhonesService} from "../../services/phones.service";
import {Phone} from "../../models/phone";

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})
export class UpdatePhoneComponent implements OnInit {

  id: string;
  phone: Phone

  constructor(private router: Router, private phonesService: PhonesService) {
    this.id =  router.url.split("/")[2]
    // this.name = phonesService.getPhone()
  }

  ngOnInit(): void {
    this.phonesService.getPhone(this.id).subscribe(data => {
      this.phone = data;
    });
  }

  onDelete(phoneId: string) {
    this.phonesService.deletePhone(phoneId).subscribe(() => {
      console.log("Phone deleted!");
    });
  }
}
