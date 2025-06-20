import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre } from '../../../models/GENRE';
import { Track } from '../../../models/track';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent implements OnInit{

  trackForm!: FormGroup;
  isEditMode = false;
  tracksId!: number;
  errorMessage ='';
  genre = Genre;
  genreEnumKeys = Object.keys(this.genre) as Array<keyof typeof Genre>

  constructor(
    private svc: TrackService, 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.trackForm= this.fb.group({
      title: ['',[Validators.required]],
      duration: ['',[Validators.required]],
      releaseDate: ['',[Validators.required]],
      genre: ['',[Validators.required]],
    });
    this.route.paramMap.subscribe(params =>{
      const idParam = params.get('id');
      if(idParam){
        this.isEditMode = true;
        this.tracksId = +idParam;
        this.loadTrack(this.tracksId);
      }
    });
  
  }

  loadTrack(id: number): void{
    this.svc.getTrackById(id).subscribe({
      next: (track: Track) => this.trackForm.patchValue(track),
      error: ()=> this.errorMessage = 'Error loading Track'
    })
  }

  onSubmit(): void{
    if(this.trackForm.invalid){
      return;
    }

    const trackData: Track ={
      title: this.trackForm.value.title,
      duration: this.trackForm.value.duration,
      genre: this.trackForm.value.genre,
      releaseDate: this.trackForm.value.releaseDate,
    };

    if(this.isEditMode && this.tracksId != null){
      trackData.id =this.tracksId;
      this.svc.updateTrack(this.tracksId, trackData).subscribe({
        next: () => this.router.navigate(['/tracks']),
        error: () => this.errorMessage = 'Error updating track'
      });
    }else{
      this.svc.createTrack(trackData).subscribe({
        next: () => this.router.navigate(['/tracks']),
        error: () => this.errorMessage = 'Error creating track'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tracks']);
  }
}
