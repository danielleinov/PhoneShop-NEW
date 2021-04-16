import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReviewsService} from "../../services/reviews.service";
import {Review} from "../../models/review";

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {

  id: string;
  review: Review

  constructor(private router: Router, private reviewsService: ReviewsService) {
    this.id =  router.url.split("/")[2]
  }

  ngOnInit(): void {
    this.reviewsService.getReview(this.id).subscribe(data => {
      this.review = data;
    });
  }

  onUpdate(reviewId: string, content: string, author: string) {
    this.reviewsService.updateReview(reviewId, {
      content: content,
      author: author,
    }).subscribe(() => {
      this.router.navigate(['/reviews']);
    });
  }

  onDelete(reviewId: string) {
    this.reviewsService.deleteReview(reviewId).subscribe(() => {
      this.router.navigate(['/reviews']);
    });
  }
}
