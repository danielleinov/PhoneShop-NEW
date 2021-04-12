import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PhonesService} from 'src/app/services/phones.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Output() panel = new EventEmitter<string>();

  constructor(private phonesService: PhonesService) {
  }

  ngOnInit(): void {
  }

  onRefresh() {
    this.panel.emit("Refresh");
  }

  // Possible also receive the json when subscribe to display it
  onAdd(displayName: string, description: string, price: number, discount: number) {
    this.phonesService.addPhone(displayName, description, price, discount).subscribe(() => {
      this.panel.emit("Refresh");
    });
  }

  onScrape() {
    this.phonesService.scrape().subscribe(() => {
      this.panel.emit("Refresh");
    });
  }
}
