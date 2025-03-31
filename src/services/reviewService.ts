import { Review } from '../types';

class ReviewService {
  private reviews: Review[] = [];

  async getPropertyReviews(propertyId: string): Promise<Review[]> {
    return this.reviews.filter(review => review.propertyId === propertyId);
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return this.reviews.filter(review => review.userId === userId);
  }

  async createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  async updateReview(reviewId: string, updates: Partial<Review>): Promise<Review | null> {
    const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex === -1) return null;

    this.reviews[reviewIndex] = {
      ...this.reviews[reviewIndex],
      ...updates,
    };
    return this.reviews[reviewIndex];
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter(review => review.id !== reviewId);
    return this.reviews.length < initialLength;
  }

  async getAverageRating(propertyId: string): Promise<number> {
    const propertyReviews = this.reviews.filter(review => review.propertyId === propertyId);
    if (propertyReviews.length === 0) return 0;
    
    const sum = propertyReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / propertyReviews.length;
  }
}

export const reviewService = new ReviewService(); 