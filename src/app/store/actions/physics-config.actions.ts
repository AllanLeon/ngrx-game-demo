import { Action } from '@ngrx/store';
import { Vector2 } from 'app/core/models/common';

export enum PhysicsConfigActionTypes {
  SET_GRAVITY = '[PhysicsConfig] Set Gravity',
  RESET = '[PhysicsConfig] Reset',
}

export class ResetPhysics implements Action {
  readonly type = PhysicsConfigActionTypes.RESET;
}

export class UpdateGravity implements Action {
  readonly type = PhysicsConfigActionTypes.SET_GRAVITY;

  constructor(public payload: Vector2) {}
}

export type PhysicsConfigActionsUnion =
  | ResetPhysics
  | UpdateGravity;
