import { Action } from '@ngrx/store';

export enum GravityActionTypes {
  APPLY_TO_GAME_OBJECTS = '[Gravity] Apply to game objects',
}

export class ApplyGravityToGameObjects implements Action {
  readonly type = GravityActionTypes.APPLY_TO_GAME_OBJECTS;
}

export type GravityActionsUnion =
  | ApplyGravityToGameObjects;
