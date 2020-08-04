import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';

// Components 
import { CanvasDialogComponent } from './canvas-dialog.component';




@NgModule({
  declarations: [CanvasDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class CanvasDialogModule { }
