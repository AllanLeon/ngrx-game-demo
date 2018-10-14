import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { GameState } from '../../models';
import { ApplySpeedToGameObjects, BodyActionTypes } from '../../actions';
import { timer, Subject } from 'rxjs';
import { selectAllGameObjects } from '../../selectors';
import { UpdateManyGameObjects } from '../../actions/game-objects.actions';
import { UpdateStr } from '@ngrx/entity/src/models';
import { GameObject } from '../../../core';

@Injectable()
export class BodyEffects implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private actions$: Actions,
    private store: Store<GameState>,
  ) {
    timer(0, 100).subscribe((x) => {
      this.store.dispatch(new ApplySpeedToGameObjects());
    });
  }

  @Effect()
  applySpeedToGameObjects$ = this.actions$
    .pipe(
      ofType<ApplySpeedToGameObjects>(BodyActionTypes.APPLY_SPEED_TO_GAME_OBJECTS),
      withLatestFrom(this.store.select(selectAllGameObjects)),
      map(([_, gameObjects]) => {
        const changes: UpdateStr<GameObject>[] = [];
        gameObjects.forEach((gameObject) => {
          const { position, speed } = gameObject;
          if (speed.x !== 0 || speed.y !== 0) {
            changes.push({
              id: gameObject.id,
              changes: {
                position: {
                  x: position.x + speed.x,
                  y: position.y + speed.y,
                },
              },
            });
          }
        });
        return new UpdateManyGameObjects(changes);
      }),
    );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
