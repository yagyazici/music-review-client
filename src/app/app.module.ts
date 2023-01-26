import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { ChangePasswordComponent } from './pages/settingspage/change-password/change-password.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DefaultModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
