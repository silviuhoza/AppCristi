import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
