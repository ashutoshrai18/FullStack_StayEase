import { UserModel } from '../user/user-model';
import { RoomModel } from '../room/room-model';

// export interface BookingModel {
//   bookingId: number;
//   user: UserModel;
//   room: RoomModel;
//   checkInDate: string; // ISO date string
//   checkOutDate: string; // ISO date string
//   status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
// }

export interface BookingModel {
  bookingId?: number;
  user: UserModel;
  room: RoomModel;
  checkInDate: string;      // ISO date string
  checkOutDate: string;     // ISO date string
  bookingDate?: string;     // ISO date string, set by backend
  noOfPersons: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'Confirmed' | 'Pending' | 'Cancelled';
}
