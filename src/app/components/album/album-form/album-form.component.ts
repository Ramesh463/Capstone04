import { Album } from './../../../models/album';
import { ArtistService } from './../../../services/artist.service';
import { ArtistListComponent } from './../../artist/artist-list/artist-list.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Track } from '../../../models/track';
import { Artist } from '../../../models/artist';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { TrackService } from '../../../services/track.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-album-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.css'
})
export class AlbumFormComponent implements OnInit {
  albumForm!: FormGroup;
  allTrack: Track[] = [];
  allArtist: Artist[] = [];


  registeredArtists: Artist[] = [];
  isEditMode = false;
  albumId?: number;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private albumSvc: AlbumService,
    private trackSvc: TrackService,
    private artistSvc: ArtistService

  ){}
  ngOnInit(): void {

    this.albumForm = this.fb.group({
      trackId: [null,Validators.required],
      albumName: ['',[Validators.required]],
      genre:['',[Validators.required]]
    });

    this.trackSvc.getAllTrack().subscribe({
      next: (tracks) => this.allTrack = tracks,
      error: () => this.errorMessage = 'Error loading tracks'
    });

    this.artistSvc.findAllArtists().subscribe({
      next: (artists) => this.allArtist = artists,
      error: () => this.errorMessage = 'Error loading artists'
    });

    this.route.paramMap.subscribe(params =>{
      const idParam =params.get('id');
      if(idParam){
        this.isEditMode =true;
        this.albumId = +idParam;
        this.loadAlbum(this.albumId);
      }
    });



  }

  loadAlbum(id: number): void {
    this.albumSvc.findById(id).subscribe({
      next:(salbum: Album) => {
        this.albumForm.patchValue({
          //trackId: salbum.track.id,
          albumName: salbum.albumName,
          genre: salbum.genre
        });
        this.registeredArtists = salbum.artist || [];
      },
      error:() =>this.errorMessage = 'Error loading albums'
    });
  }

  onSubmit(): void{
    if(this.albumForm.invalid){
      return;
    }

    const formValue =this.albumForm.value;
    const salbumData: Album ={
      track: {id: formValue.trackId} as Track,
      albumName: formValue.albumName,
      genre: formValue.genre
    };

    if(this.isEditMode && this.albumId != null){
      salbumData.id =this.albumId;
      this.albumSvc.updateAlbum(this.albumId,salbumData).subscribe({
         next: () => this.router.navigate(['/albums']),
        error: () => this.errorMessage = 'Error updating album'
      });
    }else {
      this.albumSvc.createAlbum(salbumData).subscribe({
         next: () => this.router.navigate(['/albums']),
        error: () => this.errorMessage = 'Error creating album'
      });
    }
  }
cancel(): void {
    this.router.navigate(['/albums']);
  }



  addArtistToAlbum(artistId: number ): void{
    if(!this.albumId) return;
    this.albumSvc.registerArtist(this.albumId, artistId).subscribe({
      next:(updatedAlbum) =>{
        this.registeredArtists = updatedAlbum.artist || [];
      },
      error: () => this.errorMessage = 'Error registering Artist'
    });
  }


   isRegistered(artist: Artist): boolean{
    return this.registeredArtists.some(s=> s.id == artist.id);
  }


}
