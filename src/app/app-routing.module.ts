import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RegisterComplainComponent } from './pages/register-complain/register-complain.component';

const routes: Routes = [
  { path: 'home', component: MainComponent, pathMatch: 'full' },
  { path: 'register-complain', component: RegisterComplainComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
