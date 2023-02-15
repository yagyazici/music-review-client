import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, DragAxis, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SearchFavoriteAlbumComponent } from './search-favorite-album/search-favorite-album.component';
import { AuthService } from 'src/app/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Album } from 'src/app/models/album';
import { UserDTO } from 'src/app/models/userDTO';
import { DataService } from 'src/app/services/dataservice.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { Router } from '@angular/router';


@Component({
    selector: 'app-favorite-albums-settings',
    templateUrl: './favorite-albums-settings.component.html',
    styleUrls: ['./favorite-albums-settings.component.css']
})
export class FavoriteAlbumsSettingsComponent implements OnInit {

    favoriteAlbums: Album[];
    loggedUser: UserDTO;
    innerWidth: number;
    lockAxis: DragAxis;
    listOrientation: DropListOrientation;

    constructor(
        public dialog: MatDialog,
        private authService: AuthService,
        private dataService: DataService,
        private signalRService: SignalRService,
        private router: Router,
        private snackBar: MatSnackBar,
        private elementRef: ElementRef
    ) { }

    async ngOnInit() {
        this.authService.refreshToken()
        this.dataService.currentUser.subscribe(currentUser => this.loggedUser = currentUser);
        await this.getCurrentUserFavoriteAlbums();
        this.threeAlbumRule()
        this.signalRService.on(HubUrls.UserHub, ReceiveFunctions.UserFavoriteAlbumsUpdatedMessageFunction, message => {
            if (message == this.loggedUser.Id) {
                this.getCurrentUserFavoriteAlbums().then(data => {
                    this.threeAlbumRule();
                });
            }
        });
        this.onResize();
    }

    @HostListener("window:resize")
    onResize() {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 992){
            console.log("992 den küçük");
            this.listOrientation = "vertical"
            this.lockAxis = "y"
        }
        else if (this.innerWidth >=  992) {
            console.log("992 den büyük");
            this.listOrientation = "horizontal"
            this.lockAxis = "x"
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.favoriteAlbums, event.previousIndex, event.currentIndex);
    }

    searchDialog(idx: number, favoriteAlbum: Album): void {
        const dialogRef = this.dialog.open(SearchFavoriteAlbumComponent, {
            data: { idx: idx, favoriteAlbum: favoriteAlbum },
            autoFocus: true,
            width: "750px",
            maxHeight: "500px"
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.favoriteAlbums[idx] = result;
            }
        });
    }

    async getCurrentUserFavoriteAlbums() {
        await firstValueFrom(this.authService.getCurrentUserFavoriteAlbums()).then(data => {
            this.favoriteAlbums = data;
        })
    }

    updateUserFavoriteAlbums(favoriteAlbums: Album[]) {
        var favoriteAlbums = this.favoriteAlbums.filter(album => album.id != null)
        this.authService.updateUserFavoriteAlbums(favoriteAlbums).subscribe();
        this.openSnackBar();
    }

    threeAlbumRule() {
        while (this.favoriteAlbums.length != 3) {
            this.favoriteAlbums.push(new Album());
        }
    }

    cancel() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    openSnackBar() {
        this.snackBar.open('Favorite albums edited successfully!', 'Close');
    }
}
