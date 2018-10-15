import { Action } from '@ngrx/store';
import { GameObject } from 'app/core/models';
import { Update } from '@ngrx/entity';
import { Vector2 } from '../../core/models/common';

export enum GameObjectsActionTypes {
  ADD_OBJECT = '[GameObjects] Add Object',
  REMOVE_OBJECT = '[GameObjects] Remove Object',

  UPDATE_OBJECT = '[GameObjects] Update Object',
  UPDATE_OBJECT_SUCCESS = '[GameObjects] Update Object Success',

  UPDATE_MANY_OBJECTS = '[GameObjects] Update Many Objects',
  UPDATE_MANY_OBJECTS_SUCCESS = '[GameObjects] Update Many Objects Success',

  SET_OBJECT_SPEED = '[GameObjects] Set Object Speed',

  REVERT_MANY_GAME_OBJECTS = '[GameObjects] Revert Many Objects',
  REDRAW_ALL = '[GameObjects] Redraw All',

  /**
   * This action shouldn't trigger anything, it's just used when it's necessary to return an action in an effect
   */
  IDLE = '[GameObjects] Idle',
}

export class AddGameObject implements Action {
  readonly type = GameObjectsActionTypes.ADD_OBJECT;

  constructor(public payload: GameObject) {}
}

export class RemoveGameObject implements Action {
  readonly type = GameObjectsActionTypes.REMOVE_OBJECT;

  constructor(public payload: { id: string }) {}
}

export class UpdateGameObject implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_OBJECT;

  constructor(public payload: Update<GameObject>) {}
}

export class UpdateGameObjectSuccess implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_OBJECT_SUCCESS;

  constructor(public payload: Update<GameObject>) {}
}

export class UpdateManyGameObjects implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_MANY_OBJECTS;

  constructor(public payload: Update<GameObject>[]) {}
}

export class UpdateManyGameObjectsSuccess implements Action {
  readonly type = GameObjectsActionTypes.UPDATE_MANY_OBJECTS_SUCCESS;

  constructor(public payload: {
    updates: Update<GameObject>[],
    redraw: boolean,
    ignore?: boolean,
  }) {}
}

export class SetGameObjectSpeed implements Action {
  readonly type = GameObjectsActionTypes.SET_OBJECT_SPEED;

  constructor(public payload: { gameObject: GameObject, speed: Vector2 }) {}
}

export class RevertManyGameObjects implements Action {
  readonly type = GameObjectsActionTypes.REVERT_MANY_GAME_OBJECTS;

  constructor(public payload: GameObject[]) {}
}

export class RedrawAllGameObjects implements Action {
  readonly type = GameObjectsActionTypes.REDRAW_ALL;
}

export class GameObjectsIdle implements Action {
  readonly type = GameObjectsActionTypes.IDLE;
}

export type GameObjectsActionsUnion =
  | AddGameObject
  | RemoveGameObject
  | UpdateGameObject
  | UpdateGameObjectSuccess
  | UpdateManyGameObjects
  | UpdateManyGameObjectsSuccess
  | SetGameObjectSpeed
  | RevertManyGameObjects
  | RedrawAllGameObjects
  | GameObjectsIdle;
