import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Phone} from 'src/app/models/phone';
import {PhonesService} from 'src/app/services/phones.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css',
    '../../vendor/fontawesome-free/css/all.min.css',
    '../../vendor/datatables/dataTables.bootstrap4.min.css'
  ]
})
export class PhonesComponent {

  phones: Phone[] = [];

  searchPhoneName: string;
  searchPhoneManufacturer: string;
  searchPhoneMaxPrice: number;

  constructor(private phonesService: PhonesService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe(params => {
      this.searchPhoneName = params['name'] ? params['name'] : ""
      this.searchPhoneManufacturer = params['manufacturer'] ? params['manufacturer'] : ""
      this.searchPhoneMaxPrice = params['maxPrice'] ? parseInt(params['maxPrice']) : Number.MAX_SAFE_INTEGER
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.searchPhoneName !== '' || this.searchPhoneManufacturer !== '' || this.searchPhoneMaxPrice < Number.MAX_SAFE_INTEGER) {
      this.phonesService.searchPhones(this.searchPhoneName, this.searchPhoneManufacturer, this.searchPhoneMaxPrice).subscribe((data) => {
        this.phones = data;
      })
    }
    else {
      this.phonesService.getPhones().subscribe(data => {
        this.phones = data;
      });
    }
  }

  onAdd(displayName: string, manufacturer: string, imageUrl: string, price: number, discount: number) {
    this.phonesService.addPhone(displayName, manufacturer, imageUrl, price, discount).subscribe(() => {
      this.load();
    });
  }

  onDelete(phoneId: string) {
    this.phonesService.deletePhone(phoneId).subscribe(() => {
      this.load();
    });
  }

  onScrape() {
    this.phonesService.scrape().subscribe(() => {
      this.load();
    })
  }

  onSearch(name: string, manufacturer: string, maxPrice: number) {
    this.searchPhoneName = name ;
    this.searchPhoneManufacturer = manufacturer;
    this.searchPhoneMaxPrice = isNaN(maxPrice) ? Number.MAX_SAFE_INTEGER : maxPrice;

    this.load();
  }
}
