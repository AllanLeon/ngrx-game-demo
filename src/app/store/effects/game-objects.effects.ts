import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, withLatestFrom } from 'rxjs/operators';

import { GameObjectManager } from 'app/core/services';
import {
  AddGameObject,
  GameObjectsActionTypes,
  RedrawAllGameObjects,
  UpdateGameObject,
  UpdateManyGameObjects,
  SetGameObjectSpeed,
  UpdateGameObjectSuccess,
  UpdateManyGameObjectsSuccess,
  RevertManyGameObjects,
  GameObjectsIdle,
} from '../actions/game-objects.actions';
import { Store } from '@ngrx/store';
import { GameState } from '../models';
import { selectGameObjectsEntities, selectAllGameObjects } from '../selectors';
import { CheckCollisionBetweenGameObjects } from '../actions';
import { GameObject } from '../../core';
import { UpdateStr } from '@ngrx/entity/src/models';

@Injectable()
export class GameObjectsEffects {

  constructor(
    private actions$: Actions,
    private gameObjectManager: GameObjectManager,
    private store: Store<GameState>,
  ) { }

  @Effect()
  addGameObject$ = this.actions$
    .pipe(
      ofType<AddGameObject>(GameObjectsActionTypes.ADD_OBJECT),
      map(() => new RedrawAllGameObjects()),
    );

  @Effect()
  updateGameObject$ = this.actions$
    .pipe(
      ofType<UpdateGameObject>(GameObjectsActionTypes.UPDATE_OBJECT),
      withLatestFrom(this.store.select(selectGameObjectsEntities)),
      map(([action, entities]) => new UpdateGameObjectSuccess({
        ...action.payload,
        changes: {
          ...action.payload.changes,
          previousState: entities[action.payload.id],
        },
      })),
    );

  @Effect()
  updateManyGameObject$ = this.actions$
    .pipe(
      ofType<UpdateManyGameObjects>(GameObjectsActionTypes.UPDATE_MANY_OBJECTS),
      withLatestFrom(this.store.select(selectGameObjectsEntities)),
      map(([action, entities]) => new UpdateManyGameObjectsSuccess({
        updates: action.payload.map((toUpdate) => ({
          ...toUpdate,
          changes: {
            ...toUpdate.changes,
            previousState: entities[toUpdate.id],
          },
        })),
        redraw: false,
      })));

  @Effect()
  updateGameObjectSuccess$ = this.actions$
    .pipe(
      ofType<UpdateGameObjectSuccess>(GameObjectsActionTypes.UPDATE_OBJECT_SUCCESS),
      map(() => new CheckCollisionBetweenGameObjects()),
    );

  @Effect()
  updateManyGameObjectSuccess$ = this.actions$
    .pipe(
      ofType<UpdateManyGameObjectsSuccess>(GameObjectsActionTypes.UPDATE_MANY_OBJECTS_SUCCESS),
      map((action) => {
        if (!action.payload.ignore) {
          if (action.payload.redraw) {
            return new RedrawAllGameObjects();
          } else {
            return new CheckCollisionBetweenGameObjects();
          }
        }
        return new GameObjectsIdle();
      }),
    );

  @Effect()
  setGameObjectSpeed$ = this.actions$
    .pipe(
      ofType<SetGameObjectSpeed>(GameObjectsActionTypes.SET_OBJECT_SPEED),
      map((action) => new UpdateGameObject({
        id: action.payload.gameObject.id,
        changes: {
          speed: action.payload.speed,
        },
      }))
    );

  @Effect()
  revertGameObjects$ = this.actions$
    .pipe(
      ofType<RevertManyGameObjects>(GameObjectsActionTypes.REVERT_MANY_GAME_OBJECTS),
      map((action) => new UpdateManyGameObjectsSuccess({
        redraw: true,
        updates: action.payload.map((gameObject): UpdateStr<GameObject> => ({
          id: gameObject.id,
          changes: {
            ...gameObject.previousState,
          },
        })),
      })),
    );

  @Effect()
  redrawAllGameObjects$ = this.actions$
    .pipe(
      ofType<RedrawAllGameObjects>(GameObjectsActionTypes.REDRAW_ALL),
      withLatestFrom(this.store.select(selectAllGameObjects)),
      map(([_, gameObjects]) => {
        this.gameObjectManager.redrawAll();
        return new UpdateManyGameObjectsSuccess({
          updates: gameObjects.map((gameObject): UpdateStr<GameObject> => ({
            id: gameObject.id,
            changes: {
              previousState: null,
            },
          })),
          ignore: true,
          redraw: false,
        });
      }),
    );
}
