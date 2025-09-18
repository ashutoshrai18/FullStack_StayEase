import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListsComponent } from './components/website/hotel-lists/hotel-lists';
import { HotelDetailsComponent } from './components/website/hotel-details/hotel-details';

const routes: Routes = [
  { path: '', component: HotelListsComponent },
  { path: 'hotel/:id', component: HotelDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
