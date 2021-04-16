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
  }

  ngOnInit(): void {
    this.phonesService.getPhone(this.id).subscribe(data => {
      this.phone = data;
    });
  }

  onUpdate(phoneId: string, displayName: string, manufacturer: string, imageUrl: string, price: number, discount: number) {
    this.phonesService.updatePhone(phoneId, {
      displayName: displayName,
      manufacturer: manufacturer,
      imageUrl: imageUrl,
      price: price,
      discount: discount
    }).subscribe(() => {
      this.router.navigate(['/phones']);
    });
  }

  onDelete(phoneId: string) {
    this.phonesService.deletePhone(phoneId).subscribe(() => {
      this.router.navigate(['/phones']);
    });
  }
}
