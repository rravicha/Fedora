import { Injectable } from '@angular/core';
import { Board } from '../../models/Board.model';
import { Player } from '../../models/Player.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Board = {
    width: 0,
    height: 0,
  };
  shooter: Player = {
    x: 0,
    y: 0,
  };
  target: Player = {
    x: 0,
    y: 0
  };
  distance = 0;
  data: any;

  currentBoard = new BehaviorSubject<Board>(this.board);
  currentShooter = new BehaviorSubject<Player>(this.shooter);
  currentTarget = new BehaviorSubject<Player>(this.target);
  currentDistance = new BehaviorSubject<number>(this.distance);
  currentData = new BehaviorSubject<any>(this.data);
  showBoard = new BehaviorSubject<boolean>(false);
  constructor() { }
}
