import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { firstValueFrom } from 'rxjs';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { DeleteImageComponent } from '../../../common/delete-image/delete-image.component';
import { CommonService } from 'src/app/services/CommonServices/common.service';

@Component({
    selector: 'app-profile-picture-settings',
    templateUrl: './profile-picture-settings.component.html',
    styleUrls: ['./profile-picture-settings.component.css']
})
export class ProfilePictureSettingsComponent implements OnInit {

    showCropper = false;
    currentUser: UserDTO;
    message: string;
    progress: number;
    imageChangedEvent: any = "";
    croppedImage: any = "";
    scale = 1;
    transform: ImageTransform = {};

    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        public dialog: MatDialog,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
        await this.getUser();
    }

    uploadFile(files: any) {
        this.authService.uploadFile(files)?.subscribe({
            next: (event) => location.reload(),
            error: error => { }
        })
    }

    cancelUploadFile() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        const imgFile = new File([base64ToFile(this.croppedImage)], `${this.currentUser.Id}.jpeg`);
        this.croppedImage = imgFile
    }

    imageLoaded() {
        this.showCropper = true;
    }

    async getUser() {
        await firstValueFrom(this.authService.GetUser(this.currentUser.Id)).then(data => {
            this.dataService.changeCurrentUser(data);
        });
    }

    deleteDialog() {
        const dialogRef = this.dialog.open(DeleteImageComponent, {
            autoFocus: false,
            width: "450px",
            maxHeight: "750px",
            panelClass: "delete-dialog"
        });
    }

    getImage = (profilePicture: string): string => this.commonService.getImage(profilePicture);
}
