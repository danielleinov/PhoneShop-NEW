import {Component} from '@angular/core';
import {Review} from "../../models/review";
import {ReviewsService} from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../../vendor/fontawesome-free/css/all.min.css']
})
export class ReviewsComponent {

  reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.reviewsService.getReviews().subscribe(data => {
      this.reviews = data;
    });
  }

  onAdd(displayName: string, manufacturer: string, price: number, discount: number) {
    this.reviewsService.addReview(displayName, manufacturer, price, discount);
  }

  onDelete(reviewId: string) {
    this.reviewsService.deleteReview(reviewId).subscribe(() => {
      this.load();
    });
  }

  handlePanel(action: string) {
    this.load();
  }
}
