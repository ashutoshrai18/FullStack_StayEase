import {HotelModel} from '../model/hotel/hotel-model';

export interface HotelWithRoomIds{
  hotel: HotelModel;
  availableRoomIds: number[];
}
