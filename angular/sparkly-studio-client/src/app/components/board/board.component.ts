import { Component, OnInit, OnDestroy } from '@angular/core';


// Services
import { BoardService } from '../../services/board.service';


// Models
import { Board } from '../../../../src/models/Board.model';
import { Player } from '../../../../src/models/Player.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  public board: Board = {
    width: 0,
    height: 0
  };
  public shooter: Player = {
    x: 0,
    y: 0
  };
  public target: Player = {
    x: 0,
    y: 0
  };
  public angles = [];
  public displayAngles = [];
  public numberOfPossibleDirections: number;
  public dataArrived = false;

  constructor(public boardService: BoardService) {}

  ngOnInit() {
    this.getBoard();
    this.getShooter();
    this.getTarget();
    this.getData();

  }

  getBoard(): void{
    this.subs.push(this.boardService.currentBoard.subscribe(board => {
      if (board.width < 0){
        this.board = {...board, width: 0};
      } else{
        this.board = {...board, width: board.width};
      }
      if (board.height < 0){
        this.board.height = 0;
      } else {
        this.board.height = board.height;
      }
    }));
  }

  getShooter(): void{
    this.subs.push(this.boardService.currentShooter.subscribe(shooter => {
      if (shooter.x < 0){
        this.shooter.x = 0;
      } else {
        this.shooter.x = shooter.x;
      }
      if (shooter.y < 0){
        this.shooter.y = 0;
      } else {
        this.shooter.y = shooter.y;
      }
    }));
  }

  getTarget(): void{
    this.subs.push(this.boardService.currentTarget.subscribe(target => {
      if (target.x < 0){
        this.target.x = 0;
      } else {
        this.target.x = target.x;
      }
      if (target.y < 0){
        this.target.y = 0;
      } else {
        this.target.y = target.y;
      }
    }));
  }

  getData(): void {
    this.subs.push(this.boardService.currentData.subscribe(data => {
      if (data) {
        this.dataArrived = true;
        this.angles = data.angles.map((angle: number) => {
          return  this.hasDecimal(angle) ? angle.toFixed(2) : angle;
        });
        this.getDisplayAngles();
        this.numberOfPossibleDirections = data.no_of_direction;
      }
    }));
  }

  hasDecimal(n: number): boolean {
    let result = (n - Math.floor(n)) !== 0;
    return result ? true : false; 
  }

  getDisplayAngles(){
    if (this.angles.length > 20){
      this.displayAngles = [...this.displayAngles, ...this.angles.slice(this.displayAngles.length, this.displayAngles.length + 20)];
    } else{
      this.displayAngles = [...this.angles];
    }
  }
  ngOnDestroy(){
    this.subs.forEach(subscription => subscription.unsubscribe());
  }
}
