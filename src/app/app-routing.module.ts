import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AlbumpageComponent } from './pages/albumpage/albumpage.component';
import { ReviewFormComponentComponent } from './pages/albumpage/review-form-component/review-form-component.component';
import { ReviewsComponentComponent } from './pages/albumpage/reviews-component/reviews-component.component';
import { CurrentsongComponent } from './pages/homepage/currentsong/currentsong.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { DeleteReviewComponent } from './pages/profilepage/profile-reviews/delete-review/delete-review.component';
import { ProfileReviewsComponent } from './pages/profilepage/profile-reviews/profile-reviews.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { FavoriteAlbumsSettingsComponent } from './pages/settingspage/favorite-albums-settings/favorite-albums-settings.component';
import { ProfilePictureSettingsComponent } from './pages/settingspage/profile-picture-settings/profile-picture-settings.component';
import { ProfileSettingsComponent } from './pages/settingspage/profile-settings/profile-settings.component';
import { EditReviewComponent } from './pages/profilepage/profile-reviews/edit-review/edit-review.component';
import { SearchFavoriteAlbumComponent } from './pages/settingspage/favorite-albums-settings/search-favorite-album/search-favorite-album.component';
import { ProfileLikesComponent } from './pages/profilepage/profile-likes/profile-likes.component';
import { ArtistpageComponent } from './pages/artistpage/artistpage.component';
import { ArtistAlbumsComponent } from './pages/artistpage/artist-albums/artist-albums.component';
import { ArtistSinglesComponent } from './pages/artistpage/artist-singles/artist-singles.component';
import { FeedpageComponent } from './pages/feedpage/feedpage.component';

const routes: Routes = [
	{
		path: "", 
		component: DefaultComponent,
		children: [
			{ path : "", component: HomepageComponent, children : [
				{ path: "", component: CurrentsongComponent}
			]},
			{ path: "reviews", component: FeedpageComponent },
			{ path : "login", component: LoginpageComponent },
			{ path : "register", component: RegisterpageComponent },
			{ path : "search", component: SearchpageComponent },
			{ path : "album/:album-id", component: AlbumpageComponent, children: [
				{ path: "", component: ReviewFormComponentComponent },
				{ path: "", component: ReviewsComponentComponent }
			]},
			{ path: "artist/:artist-id", component: ArtistpageComponent, children: [
				{ path: "", component: ArtistAlbumsComponent },
				{ path: "singles", component: ArtistSinglesComponent },
				{ path: "", redirectTo: "", pathMatch: "full" }
			] },
			{ path: "profile/:user-id", component: ProfilepageComponent, children: [
				{ path: "", component: ProfileReviewsComponent , children: [
					{ path: "edit-review", component: EditReviewComponent },
					{ path: "delete-review", component: DeleteReviewComponent }
				]},
				{ path: "likes", component: ProfileLikesComponent }
			]},
			{ path: "settings", children: [
				{ path: "", component: ProfileSettingsComponent },
				{ path: "picture", component: ProfilePictureSettingsComponent },
				{ path: "favorite-albums", component: FavoriteAlbumsSettingsComponent, children: [
					{ path: "", component: SearchFavoriteAlbumComponent }
				] },
				{ path: "", redirectTo: "", pathMatch: "full" }
			]}
		],
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }