
import { Review } from '../review/review-model';
import { RoomModel } from '../room/room-model';

// export interface HotelModel {
// 	hotelId: number;
// 	name: string;
// 	address: string;
// 	rooms?: RoomModel[];
// 	reviews?: Review[];
// }

export interface HotelModel {
  hotelId?: number;
  name: string;
  address: string;
  description?: string;
  rating?: number;
  pricePerNight?: number;
  roomType?: string;
  contactInfo?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  latitude?: number;    // Add this
  longitude?: number;   // Add this
  rooms?: RoomModel[];
  reviews?: Review[];
}
