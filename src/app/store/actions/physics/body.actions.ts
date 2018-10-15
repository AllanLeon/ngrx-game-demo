import { Action } from '@ngrx/store';

export enum BodyActionTypes {
  APPLY_SPEED_TO_GAME_OBJECTS = '[Body] Apply Speed to Game Objects',
  CHECK_COLLISION_BETWEEN_GAME_OBJECTS = '[Body] Check Collision Between Game Objects',
}

export class ApplySpeedToGameObjects implements Action {
  readonly type = BodyActionTypes.APPLY_SPEED_TO_GAME_OBJECTS;
}

export class CheckCollisionBetweenGameObjects implements Action {
  readonly type = BodyActionTypes.CHECK_COLLISION_BETWEEN_GAME_OBJECTS;
}

export type BodyActionsUnion =
  | ApplySpeedToGameObjects
  | CheckCollisionBetweenGameObjects;
