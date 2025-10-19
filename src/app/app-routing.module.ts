import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./transport-components/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'rides',
    loadChildren: () =>
      import('./transport-components/rides/rides.module').then(
        (m) => m.RidesModule
      ),
  },

  { path: '**', redirectTo: 'login' }, // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
