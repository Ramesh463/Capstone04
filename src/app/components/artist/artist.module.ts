import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material';






@NgModule({
  declarations: [ArtistListComponent, ArtistFormComponent],
  imports: [CommonModule, ReactiveFormsModule,MATERIAL_IMPORTS],
})
export class StudentModule {}
