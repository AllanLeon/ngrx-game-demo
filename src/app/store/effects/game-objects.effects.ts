import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import { GameObjectManager } from 'app/core/services';
import {
  AddGameObject, GameObjectsActionTypes, RedrawAllGameObjects, UpdateGameObject, UpdateManyGameObjects,
} from '../actions/game-objects.actions';

@Injectable()
export class GameObjectsEffects {

  constructor(
    private actions$: Actions,
    private gameObjectManager: GameObjectManager,
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
      map(() => new RedrawAllGameObjects()),
    );

  @Effect()
  updateManyGameObject$ = this.actions$
    .pipe(
      ofType<UpdateManyGameObjects>(GameObjectsActionTypes.UPDATE_MANY_OBJECTS),
      map(() => new RedrawAllGameObjects()),
    );

  @Effect({ dispatch: false })
  redrawAllGameObjects$ = this.actions$
    .pipe(
      ofType<RedrawAllGameObjects>(GameObjectsActionTypes.REDRAW_ALL),
      tap(() => {
        this.gameObjectManager.redrawAll();
      }),
    );
}
