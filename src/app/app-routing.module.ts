import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
