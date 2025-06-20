import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TrackListComponent } from './track-list/track-list.component';
import { MATERIAL_IMPORTS } from '../../material';



@NgModule({
  declarations: [],
  imports: [MATERIAL_IMPORTS,
    CommonModule
  ]
})
export class TrackModule { }
