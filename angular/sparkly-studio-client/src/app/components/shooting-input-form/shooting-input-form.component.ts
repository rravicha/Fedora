import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

// Models
import { Board } from '../../../models/Board.model';
import { Player } from '../../../models/Player.model';

// Service
import { ApiCallService } from '../../services/api-call.service';
import { BoardService } from '../../services/board.service';

//Validators
import {shooterControlValidator, targetControlValidator} from './shooting-input-validators';

@Component({
  selector: 'app-shooting-input-form',
  templateUrl: './shooting-input-form.component.html',
  styleUrls: ['./shooting-input-form.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' }
    }
  ]
})
export class ShootingInputFormComponent implements OnInit {
  public errorMessage: string = 'This field is required';
  public isLoading: Boolean = false;
  @Output() showEventBoard = new EventEmitter<boolean>();
  // Form controls.
  public roomWidth = this.createFormControl();
  public roomHeight = this.createFormControl();
  public shooterXPos = this.createFormControl();
  public shooterYPos = this.createFormControl();
  public targetXPos = this.createFormControl();
  public targetYPos = this.createFormControl();
  public distance = this.createFormControl();

  public isChecked = true;

  @Output() boardChange = new EventEmitter<Board>();
  @Output() shooterChange = new EventEmitter<Player>();
  @Output() targetChange = new EventEmitter<Player>();
  @Output() posibilitiesData = new EventEmitter<boolean>();

  public settingsForm:FormGroup = new FormGroup({
    roomWidth: this.roomWidth,
    roomHeight: this.roomHeight,
    shooterXPos: this.shooterXPos,
    shooterYPos: this.shooterYPos,
    targetXPos: this.targetXPos,
    targetYPos: this.targetYPos,
    distance: this.distance,
  }, {validators: [shooterControlValidator, targetControlValidator]});

  public board: Board;
  public shooter: Player;
  public target: Player;

  constructor(
    private apiCallService: ApiCallService,
    private boardService: BoardService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showEventBoard.emit(this.isChecked);
    this.roomWidth.setValidators([Validators.required, Validators.max(1250)]);
    this.roomHeight.setValidators([Validators.required, Validators.max(1250)]);
    this.distance.setValidators([Validators.required, Validators.min(2), Validators.max(9999)]);
  }

  createFormControl() {
    return new FormControl(null, Validators.required);
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  onSubmit(f: NgForm) {
    const isFormValid = f.valid;
    if (isFormValid) {
      const values = f.value;
      const board: Board = {
        width: values.roomWidth,
        height: values.roomHeight
      }
      const shooter: Player = {
        x: values.shooterXPos,
        y: values.shooterYPos,
      }
      const target: Player = {
        x: values.targetXPos,
        y: values.targetYPos,
      }
      const requestData = {
        ply: 'bot',
        dim: `${board.width},${board.height}`,
        pp: `${shooter.x},${shooter.y}`,
        tp: `${target.x},${target.y}`,
        dist: values.distance
      };
      this.isLoading = true;
      this.apiCallService.postInput(requestData).subscribe(
        (data) => {
          this.isLoading = false;
          if (typeof data !== 'object') {
            console.log(data);
            this.openSnackBar(data, '');
          } else {

            this.boardService.currentData.next(data);
            this.boardService.showBoard.next(true);
          }
        }
      );
    } else {
      this.openSnackBar('All fields needs to be completed.', 'Please, check your form');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000,
    });
  }

  emitBoard(): void {
    this.board = {
      width: +this.roomWidth.value,
      height: +this.roomHeight.value
    };
    if (this.roomWidth.status === 'VALID' && this.roomHeight.status === 'VALID'){
      this.boardService.currentBoard.next(this.board);
    }
  }

  emitShooter(): void {
    this.shooter = {
      x: +this.shooterXPos.value,
      y: +this.shooterYPos.value
    };
    if (this.shooterXPos.status === 'VALID' && this.shooterYPos.status === 'VALID'){
      this.boardService.currentShooter.next(this.shooter);
    }

  }

  emitTarget(): void {
    this.target = {
      x: +this.targetXPos.value,
      y: +this.targetYPos.value
    };
    if (this.targetXPos.status === 'VALID' && this.targetYPos.status === 'VALID'){
      this.boardService.currentTarget.next(this.target);
    }

  }

  emitDistance(): void{
    if (this.distance.valid){
      this.boardService.currentDistance.next(+this.distance.value);
    }
  }

  getLabelColor(formControl: FormControl){
    if(formControl.dirty){
      if(formControl.valid){
        return 'green';
      } else if(formControl.invalid){
        return 'red';
      }
    }
  }
}
