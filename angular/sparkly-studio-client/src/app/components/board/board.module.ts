import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { BoardRoutingModule } from './board.routing.module';

// Components 
import { BoardComponent } from './board.component';

@NgModule({
    imports: [
      CommonModule,
      BoardRoutingModule
    ],
    declarations: [
        BoardComponent
    ],
    exports: [
        BoardComponent
    ]
  })
  export class BoardModule { }
