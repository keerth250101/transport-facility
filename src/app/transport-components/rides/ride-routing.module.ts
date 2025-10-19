import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRideComponent } from './add-ride/add-ride.component';
import { PickRideComponent } from './pick-ride/pick-ride.component';
import { RideListComponent } from './ride-list/ride-list.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddRideComponent, canActivate: [AuthGuard] },
  { path: 'pick', component: PickRideComponent, canActivate: [AuthGuard] },
  { path: 'list', component: RideListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RidesRoutingModule {}
