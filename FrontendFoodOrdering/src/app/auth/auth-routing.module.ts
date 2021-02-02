import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCardComponent } from './auth-card/auth-card.component';

const routes: Routes = [{ path: '', component: AuthCardComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
