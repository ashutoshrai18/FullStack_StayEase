import { HotelModel } from '../hotel/hotel-model';
import { UserModel } from '../user/user-model';

export interface Review {
  reviewId: number;
  comment: string;
  rating: number;
  user: UserModel;
  hotel: HotelModel;
}
