import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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

    constructor(
        public dialog: MatDialog,
        private authService: AuthService,
        private dataService: DataService,
        private signalRService: SignalRService,
        private router: Router,
    ) { }

    async ngOnInit() {
        this.authService.refreshToken()
        this.dataService.currentUser.subscribe(currentUser => this.loggedUser = currentUser);
        await this.getCurrentUserFavoriteAlbums();
        this.threeAlbumRule()
        this.signalRService.on(HubUrls.UserHub, ReceiveFunctions.UserFavoriteAlbumsUpdatedMessageFunction, message => {
            if (message == this.loggedUser.Id){
                this.getCurrentUserFavoriteAlbums().then(data => {
                    this.threeAlbumRule();
                });
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.favoriteAlbums, event.previousIndex, event.currentIndex);
    }

    searchDialog(idx: number, favoriteAlbum: Album): void {
        const dialogRef = this.dialog.open(SearchFavoriteAlbumComponent, {
            data: { idx: idx, favoriteAlbum: favoriteAlbum },
            autoFocus: true,
            width: "750px",
            maxHeight: "750px"
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.favoriteAlbums[idx] = result;
            }
        });
    }

    async getCurrentUserFavoriteAlbums(){
        await firstValueFrom(this.authService.getCurrentUserFavoriteAlbums()).then((data) => {
            var parsed = <Album[]>JSON.parse(data);
            this.favoriteAlbums = parsed;
        })
    }

    updateUserFavoriteAlbums(favoriteAlbums: Album[]){
        var favoriteAlbums = this.favoriteAlbums.filter(album => album.id != null)
        this.authService.updateUserFavoriteAlbums(favoriteAlbums).subscribe({
            next: (data: any) => {},
            error: error => {}
        })
    }

    threeAlbumRule(){
        while (this.favoriteAlbums.length != 3){
            this.favoriteAlbums.push(new Album());
        }
    }

    cancel(){
        const currentUrl = this.router.url;
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
}
