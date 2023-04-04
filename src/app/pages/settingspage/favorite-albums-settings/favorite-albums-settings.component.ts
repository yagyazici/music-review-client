import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, DragAxis, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SearchFavoriteAlbumComponent } from './search-favorite-album/search-favorite-album.component';
import { firstValueFrom } from 'rxjs';
import { Album } from 'src/app/models/Music/album';
import { DataService } from 'src/app/services/ProvideServices/dataservice.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { UserHubService } from 'src/app/services/SignalR/user.hub.service';
import { AuthService } from 'src/app/services/ModelServices/auth.service';
import { UserDTO } from 'src/app/models/Auth/userDTO';
import { CommonService } from 'src/app/services/CommonServices/common.service';

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
        private snackBar: MatSnackBar,
        private userHub: UserHubService,
        private commonService: CommonService
    ) { }

    async ngOnInit() {
        this.dataService.currentUser.subscribe(currentUser => this.loggedUser = currentUser);
        await this.getCurrentUserFavoriteAlbums();
        this.threeAlbumRule()
        this.userHub.on(ReceiveFunctions.UserFavoriteAlbumsUpdatedMessageFunction, message => {
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
            this.listOrientation = "vertical"
            this.lockAxis = "y"
        }
        else if (this.innerWidth >=  992) {
            this.listOrientation = "horizontal"
            this.lockAxis = "x"
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.favoriteAlbums, event.previousIndex, event.currentIndex);
    }

    searchDialog(idx: number, favoriteAlbum: Album): void {
        const dialogRef = this.dialog.open(SearchFavoriteAlbumComponent, {
            autoFocus: true,
            width: "750px",
            maxHeight: "500px",
            panelClass: "search-dialog"
        });
        let instance = dialogRef.componentInstance;
        instance.idx = idx;
        instance.favoriteAlbum = favoriteAlbum;
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

    reloadPage = () => this.commonService.reloadPage();

    openSnackBar() {
        this.snackBar.open('Favorite albums edited successfully!', 'Close');
    }
}
