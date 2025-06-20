import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component';
import { ArtistFormComponent } from './components/artist/artist-form/artist-form.component';
import { TrackListComponent } from './components/track/track-list/track-list.component';
import { TrackFormComponent } from './components/track/track-form/track-form.component';
import { AlbumListComponent } from './components/album/album-list/album-list.component';
import { AlbumFormComponent } from './components/album/album-form/album-form.component';


export const routes: Routes = [
 { path: '', redirectTo: '/artists', pathMatch: 'full' },
 { path: 'artists', component: ArtistListComponent },
 { path: 'artists/new', component: ArtistFormComponent},
 { path: 'artists/:id/edit', component: ArtistFormComponent},

 {path: 'tracks', component: TrackListComponent},
 {path: 'tracks/new', component: TrackFormComponent},
 {path: 'tracks/:id/edit', component: TrackFormComponent},

 {path: 'albums', component: AlbumListComponent},
 {path: 'albums/new', component: AlbumFormComponent},
 {path: 'albums/:id/edit',component: AlbumFormComponent},

 { path: '**', redirectTo: '/artists' }

];


