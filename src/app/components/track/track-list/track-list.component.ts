import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrackService } from '../../../services/track.service';
import { Router } from '@angular/router';
import { Track } from '../../../models/track';
import { Genre } from '../../../models/GENRE';
import { MATERIAL_IMPORTS } from '../../../material';

@Component({
  selector: 'app-track-list',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css',
  
})
export class TrackListComponent implements OnInit {
tracks: Track[] = [];
errorMessage ='';
genre = Genre;

constructor(private svc: TrackService, public router: Router){}

  ngOnInit(): void {
   this.loadTracks();
  }
  loadTracks(): void {
    this.svc.getAllTrack().subscribe({
       next: (data) => (this.tracks = data),
      error: (err) => (this.errorMessage = 'Error loading courses'),
    })
  }
  addTrack(): void{
    this.router.navigate(['/tracks/new'])
  }

  editTrack(track: Track): void {
    if(track.id != null){
      this.router.navigate(['/tracks', track.id, 'edit']);
    }
    
  }

  deleteTrack(track: Track): void {
    if (track.id == null) {
      return;
    }
    if (confirm(`Are you sure you want to delete course "${track.title}"?`)) {
      this.svc.deleteTrack(track.id).subscribe({
        next: () => this.loadTracks(),
        error: () => (this.errorMessage = 'Error deleting course'),
      });
    }
  }




}
