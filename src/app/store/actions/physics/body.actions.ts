import { Action } from '@ngrx/store';

export enum BodyActionTypes {
  APPLY_SPEED_TO_GAME_OBJECTS = '[Body] Apply Speed to Game Objects',
}

export class ApplySpeedToGameObjects implements Action {
  readonly type = BodyActionTypes.APPLY_SPEED_TO_GAME_OBJECTS;
}

export type BodyActionsUnion =
  | ApplySpeedToGameObjects;
