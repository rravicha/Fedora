import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';

const boardRoutes: Routes = [
    {
        path: '',
        component: BoardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(boardRoutes)],
    exports: [RouterModule]
  })
  export class BoardRoutingModule { }