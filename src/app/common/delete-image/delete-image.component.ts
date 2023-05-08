import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { CommonService } from 'src/app/services/CommonServices/common.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';

@Component({
    selector: 'app-delete-image',
    templateUrl: './delete-image.component.html',
    styleUrls: ['./delete-image.component.css']
})
export class DeleteImageComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteImageComponent>,
        private authService: AuthService,
        private commonService: CommonService
    ) { }

    deleteImage() {
        this.authService.deleteImage().subscribe(response => {
            if (response.status) {
                this.commonService.reloadPage();
                this.closeDialog();
            }
        });
    }

    closeDialog = () => this.dialogRef.close();
}
