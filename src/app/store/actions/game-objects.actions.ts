import { Action } from '@ngrx/store';
import { GameObject } from 'app/core/models';

export enum GameObjectsActionTypes {
  ADD_OBJECT = '[GameObjects] Add Object',
  REMOVE_OBJECT = '[GameObjects] Remove Object',
}

export class AddGameObject implements Action {
  readonly type = GameObjectsActionTypes.ADD_OBJECT;

  constructor(public payload: { gameObject: GameObject }) {}
}

export class RemoveGameObject implements Action {
  readonly type = GameObjectsActionTypes.REMOVE_OBJECT;

  constructor(public payload: { id: string }) {}
}

export type GameObjectsActionsUnion =
  | AddGameObject
  | RemoveGameObject;
