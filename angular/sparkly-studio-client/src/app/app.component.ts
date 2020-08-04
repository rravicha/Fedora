import { Component } from '@angular/core';
import { BoardService } from './services/board.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sparkly-studio-client';

  constructor(public boardService: BoardService){}
}
