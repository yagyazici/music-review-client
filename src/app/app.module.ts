import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { ReplyDialogComponent } from './dialogs/reply-dialog/reply-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        ReplyDialogComponent
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
