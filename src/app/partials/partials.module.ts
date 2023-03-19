import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { NotificationComponent } from '../common/notification/notification.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { NotifPipe } from '../pipes/notif.pipe';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NotificationComponent,
        NotifPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatMenuModule,
        MatBadgeModule,
        MatIconModule,
        MatDialogModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NotificationComponent
    ]
})
export class PartialsModule { }
