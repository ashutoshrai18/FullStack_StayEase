import { Component } from '@angular/core';
import { RoomService } from '../../../service/room-service';
import { RoomModule } from '../../../model/room/room-module';
        import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-room',
  imports: [CommonModule],
  templateUrl: './room.html',
  styleUrl: './room.css'
})
export class Room {
//     constructor(private roomService: RoomService) {}
// rooms: RoomModule[] = [];

// ngOnInit() {
//   this.roomService.getAllRooms().subscribe(data => {
//     this.rooms = data;
//   });
// }
}
