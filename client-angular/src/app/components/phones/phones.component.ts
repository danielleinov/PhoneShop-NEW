import {Component} from '@angular/core';
import {Phone} from 'src/app/models/phone';
import {PhonesService} from 'src/app/services/phones.service';

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

  constructor(private phonesService: PhonesService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.phonesService.getPhones().subscribe(data => {
      this.phones = data;
    });
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
}
