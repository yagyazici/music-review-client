import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { ChangePasswordComponent } from './pages/settingspage/change-password/change-password.component';
import { ErrorsPipe } from './pipes/errors.pipe';
import { DeleteImageComponent } from './pages/settingspage/profile-picture-settings/delete-image/delete-image.component';

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
