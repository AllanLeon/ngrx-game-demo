import { Action } from '@ngrx/store';
import { Vector2 } from 'app/core/models/common';

export enum PhysicsConfigActionTypes {
  UPDATE_GRAVITY = '[PhysicsConfig] Update Gravity',
  RESET = '[PhysicsConfig] Reset',
}

export class ResetPhysics implements Action {
  readonly type = PhysicsConfigActionTypes.RESET;
}

export class UpdateGravity implements Action {
  readonly type = PhysicsConfigActionTypes.UPDATE_GRAVITY;

  constructor(public payload: { gravity: Vector2 }) {}
}

export type PhysicsConfigActionsUnion =
  | ResetPhysics
  | UpdateGravity;
