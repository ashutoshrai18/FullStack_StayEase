    import { BookingModel } from "../booking/booking-model";
import { PaymentModule } from "../payment/payment-module";
import { ReviewModule } from "../review/review-module";


export interface UserModel {
  userId?: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  bookings?: BookingModel[];
  reviews?: ReviewModule[];
  payments?: PaymentModule[];
}
