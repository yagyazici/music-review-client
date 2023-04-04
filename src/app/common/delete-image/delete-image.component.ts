import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
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
        private router: Router,
    ) { }

    deleteImage() {
        this.authService.deleteImage().subscribe(response => {
            if (response.status) {
                const currentUrl = this.router.url;
                this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
                    this.router.navigate([currentUrl]);
                });
                this.closeDialog();
            }
        });
    }

    closeDialog = () => this.dialogRef.close();
}
