import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/Music/album';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.css']
})
export class LikesComponent {

    @Input() album: Album

}
