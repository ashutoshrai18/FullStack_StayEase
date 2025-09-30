import {HotelModel} from '../hotel/hotel-model';

export interface RoomModel {
  roomId: number;
  // Add other properties as needed, e.g.:
  name: string;
  type: string;
  price: number;
  status: string;
  capacity: number;
  hotel?:HotelModel;
}
