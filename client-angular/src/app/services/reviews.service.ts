import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from '../models/review';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviewsUrl = environment.reviewsUrl;

  constructor(private http: HttpClient) {
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewsUrl);
  }

  addReview(displayName: string, description: string, price: number, discount: number): Observable<Review> {
    return this.http.post<Review>(this.reviewsUrl, {
      displayName: displayName,
      description: description,
      price: price,
      discount: discount
    });
  }

  getReview(id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/${id}`;
    return this.http.get<Review>(url);
  }

  updateReview(review: Review): Observable<Review> {
    const url = `${this.reviewsUrl}/${review._id}`;
    return this.http.patch<Review>(url, {displayName: review.author});
  }

  deleteReview(id: string): Observable<Review> {
    const url = `${this.reviewsUrl}/${id}`;
    return this.http.delete<Review>(url);
  }
}
