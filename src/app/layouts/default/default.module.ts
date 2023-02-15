import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomepageComponent } from 'src/app/pages/homepage/homepage.component';
import { LoginpageComponent } from 'src/app/pages/loginpage/loginpage.component';
import { RegisterpageComponent } from 'src/app/pages/registerpage/registerpage.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PartialsModule } from 'src/app/partials/partials.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentsongComponent } from 'src/app/pages/homepage/currentsong/currentsong.component';
import { ArtistsNamesPipe } from 'src/app/pipes/artists-names.pipe';
import { SearchpageComponent } from 'src/app/pages/searchpage/searchpage.component';
import { SearchArtistNamesPipe } from 'src/app/pipes/search-artist-names.pipe';
import { AlbumpageComponent } from 'src/app/pages/albumpage/albumpage.component';
import { TimehumanizePipe } from 'src/app/pipes/timehumanize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { ReviewsComponentComponent } from 'src/app/pages/albumpage/reviews-component/reviews-component.component';
import { ReviewFormComponentComponent } from 'src/app/pages/albumpage/review-form-component/review-form-component.component';
import { GetYearPipe } from 'src/app/pipes/getyear.pipe';
import { ProfilepageComponent } from 'src/app/pages/profilepage/profilepage.component';
import { ProfileInfoComponent } from 'src/app/pages/profilepage/profile-info/profile-info.component';
import { ProfileReviewsComponent } from 'src/app/pages/profilepage/profile-reviews/profile-reviews.component';
import { ProfileSettingsComponent } from 'src/app/pages/settingspage/profile-settings/profile-settings.component';
import { BirthDatePipe } from 'src/app/pipes/birth-datepipe.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ProfilePictureSettingsComponent } from 'src/app/pages/settingspage/profile-picture-settings/profile-picture-settings.component';
import { SettingsNavbarComponent } from 'src/app/pages/settingspage/settings-navbar/settings-navbar.component';
import { FavoriteAlbumsSettingsComponent } from 'src/app/pages/settingspage/favorite-albums-settings/favorite-albums-settings.component';
import { DeleteReviewComponent } from 'src/app/pages/profilepage/profile-reviews/delete-review/delete-review.component';
import { EditReviewComponent } from 'src/app/pages/profilepage/profile-reviews/edit-review/edit-review.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchFavoriteAlbumComponent } from 'src/app/pages/settingspage/favorite-albums-settings/search-favorite-album/search-favorite-album.component';
import { ProfileFavoriteAlbumsComponent } from 'src/app/pages/profilepage/profile-info/profile-favorite-albums/profile-favorite-albums.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileLikesComponent } from 'src/app/pages/profilepage/profile-likes/profile-likes.component';
import { AutoFocusDirective } from 'src/app/directives/auto-focus.directive';
import { FollowersComponent } from 'src/app/pages/profilepage/profile-info/followers/followers.component';
import { FollowingComponent } from 'src/app/pages/profilepage/profile-info/following/following.component';
import { ArtistpageComponent } from 'src/app/pages/artistpage/artistpage.component';
import { GenresPipe } from 'src/app/pipes/genres.pipe';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CopyrightPipe } from 'src/app/pipes/copyright.pipe';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ArtistAlbumsComponent } from 'src/app/pages/artistpage/artist-albums/artist-albums.component';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatLegacySnackBarModule as MatSnackBarModule, MAT_LEGACY_SNACK_BAR_DEFAULT_OPTIONS as MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/legacy-snack-bar';
import { ArtistSinglesComponent } from 'src/app/pages/artistpage/artist-singles/artist-singles.component';
import { FeedpageComponent } from 'src/app/pages/feedpage/feedpage.component';
import { ChangePasswordComponent } from 'src/app/pages/settingspage/change-password/change-password.component';
import { ErrorsPipe } from 'src/app/pipes/errors.pipe';
import { DeleteImageComponent } from 'src/app/pages/settingspage/profile-picture-settings/delete-image/delete-image.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NotifPipe } from 'src/app/pipes/notif.pipe';
import { NgxMasonryModule } from 'ngx-masonry';


@NgModule({
    declarations: [
        DefaultComponent,
        // homepage
        HomepageComponent,
        CurrentsongComponent,
        // authorization pages
        LoginpageComponent,
        RegisterpageComponent,
        //Feed pages
        FeedpageComponent,
        // Search page
        SearchpageComponent,
        // album page 
        AlbumpageComponent,
        ReviewsComponentComponent,
        ReviewFormComponentComponent,
        // artist page
        ArtistpageComponent,
        ArtistAlbumsComponent,
        ArtistSinglesComponent,
        // profile page
        ProfilepageComponent,
        ProfileInfoComponent,
        ProfileFavoriteAlbumsComponent,
        ProfileReviewsComponent,
        EditReviewComponent,
        DeleteReviewComponent,
        ProfileLikesComponent,
        FollowersComponent,
        FollowingComponent,
        //settings page
        ProfileSettingsComponent,
        ProfilePictureSettingsComponent,
        DeleteImageComponent,
        SettingsNavbarComponent,
        FavoriteAlbumsSettingsComponent,
        SearchFavoriteAlbumComponent,
        ChangePasswordComponent,
        // pipes
        ArtistsNamesPipe,
        SearchArtistNamesPipe,
        TimehumanizePipe,
        DateAgoPipe,
        GetYearPipe,
        BirthDatePipe,
        GenresPipe,
        CopyrightPipe,
        ErrorsPipe,
        // directives
        AutoFocusDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        PartialsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StarRatingModule.forRoot(),
        ImageCropperModule,
        MatDialogModule,
        DragDropModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatTabsModule,
        MatSnackBarModule,
        MatExpansionModule,
        NgxMasonryModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        MatDatepickerModule,
        { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 1500
        }}
    ]
})

export class DefaultModule { }
