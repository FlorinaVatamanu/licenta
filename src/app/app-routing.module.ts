import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NutritionistDashboardComponent } from './nutritionist-dashboard/nutritionist-dashboard.component';
import { RestComponent } from './rest/rest.component';
import { FoodComponent } from './food/food.component';
import { BmrComponent } from './bmr/bmr.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'home-page', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'rest', component: RestComponent },
    { path: 'forgot-pass', component: ForgotPassComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'food', component: FoodComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'bmr', component: BmrComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'nutritionist', component: NutritionistDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent },                       // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
