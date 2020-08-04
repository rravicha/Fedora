import {ValidatorFn, FormGroup} from '@angular/forms';
export const shooterControlValidator: ValidatorFn = (f: FormGroup) =>{
    const shooterX = f.get('shooterXPos');
    const shooterY = f.get('shooterYPos');
    const roomWidth = f.get('roomWidth');
    const roomHeight = f.get('roomHeight');
    let error = null;

    if (shooterX.value !== null){
        if ( +shooterX.value < 0 || +shooterX.value > +roomWidth.value){
            shooterX.setErrors({invalidShooterX: true});
            error = {
                invalidShooter: true
            };
        }
    } else {
        error = {
            invalidShooter: true
        };
    }
    if (shooterY.value !== null){
        if ( +shooterY.value < 0 || +shooterY.value > +roomHeight.value){
            shooterY.setErrors({invalidShooterY: true});
            error = {
                invalidShooter: true,
            }
        }
    } else {
        error = {
            invalidShooter: true
        };
    }
    return error;
}

export const targetControlValidator: ValidatorFn = (f:FormGroup) =>{
    const targetX = f.get('targetXPos');
    const targetY = f.get('targetYPos');
    const roomWidth = f.get('roomWidth');
    const roomHeight = f.get('roomHeight');
    const shooterX = f.get('shooterXPos');
    const shooterY = f.get('shooterYPos');
    let error = null;
    targetY.setErrors(null);
    targetX.setErrors(null);
    if (+targetX.value !== null){
        if (+targetX.value < 0){
            targetX.setErrors({invalidTargetX: true});
            error = {
                invalidTarget: true
            };
        } else if (+targetX.value > +roomWidth.value ){
            targetX.setErrors({invalidTargetX: true});
            error = {
                invalidTarget: true,
            };
        }
    }
    if (+targetY.value !== null){
        if (+targetY.value < 0){
            targetY.setErrors({invalidTargetY: true});
            error = {
                invalidTarget: true
            }
        } else if (+targetY.value > +roomHeight.value ){
            targetY.setErrors({invalidTargetY: true});
            error = {
                invalidTarget: true
            }
        }
    }
    if (+targetY.value !== null && +targetX.value !== null){
        if (+targetX.value === +shooterX.value && +targetY.value === +shooterY.value){
            targetY.setErrors({targetOverShooter: true});
            targetX.setErrors({targetOverShooter: true});
            error = {
                invalidTarget: true
            };
        }
    }
    return error;
}
