import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NutritionistDashboardComponent } from './nutritionist-dashboard/nutritionist-dashboard.component';
import { RestComponent } from './rest/rest.component';
import { ProfileComponent } from './profile/profile.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { FoodComponent } from './food/food.component';
import { PaginatorModule } from 'primeng/paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';


import { BmrComponent } from './bmr/bmr.component';
import { ChartModule } from 'primeng/chart';

import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';

import {TabViewModule} from 'primeng/tabview';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        HomePageComponent,
        TopMenuComponent,
        FooterComponent,
        ForgotPassComponent,
        VerifyEmailComponent,
        NutritionistDashboardComponent,
        RestComponent,
        FoodComponent,
        BmrComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(environment.firebase),

        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatListModule,
        ButtonModule,
        CardModule,
        PaginatorModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        ChartModule,

        FileUploadModule,

        FormsModule,
        ToastModule,
        TabViewModule,

        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
