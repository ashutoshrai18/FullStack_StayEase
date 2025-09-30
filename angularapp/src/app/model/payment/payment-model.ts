import { UserModel } from '../user/user-model';
import { BookingModel } from '../booking/booking-model';

export interface Payment {
  paymentId?: number;
  amount: number;
  status?: string;
  user: UserModel;
  booking: BookingModel;
  paymentMethod?: string;     // ISO date string, set by backend
  paymentDate?: string;     // ISO date string, set by backend

}

