import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumListComponent } from './album-list/album-list.component';



@NgModule({
  declarations: [AlbumFormComponent,AlbumListComponent],
  imports: [
    CommonModule,ReactiveFormsModule,MATERIAL_IMPORTS
  ]
})
export class AlbumModule { }
