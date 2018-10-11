import { Action } from '@ngrx/store';
import { GameObject } from 'app/core/models';
import { Update } from '@ngrx/entity';
import { GameObjectEntity } from '../models';

export enum GameObjectsActionTypes {
  ADD_OBJECT = '[GameObjects] Add Object',
  REMOVE_OBJECT = '[GameObjects] Remove Object',
  UPDATE_OBJECT = '[GameObjects] Update Object',
  UPDATE_MANY_OBJECTS = '[GameObjects] Update Many Objects',

  REDRAW_ALL = '[GameObjects] Redraw All',
}

export class AddGameObject implements Action {
  readonly type = GameObjectsActionTypes.ADD_OBJECT;

  constructor(public payload: { gameObject: GameObject }) {}
}

export class RemoveGameObject implements Action {
  readonly type = GameObjectsActionTypes.REMOVE_OBJECT;

  constructor(public payload: { id: string }) {}
}

export class UpdateGameObject implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_OBJECT;

  constructor(public payload: Update<GameObjectEntity>) {}
}

export class UpdateManyGameObjects implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_MANY_OBJECTS;

  constructor(public payload: Update<GameObjectEntity>[]) {}
}

export class RedrawAllGameObjects implements Action {
  readonly type = GameObjectsActionTypes.REDRAW_ALL;
}

export type GameObjectsActionsUnion =
  | AddGameObject
  | RemoveGameObject
  | UpdateGameObject
  | UpdateManyGameObjects
  | RedrawAllGameObjects;
