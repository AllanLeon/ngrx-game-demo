import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { GameState } from '../../models';
import { ApplyGravityToGameObjects, GravityActionTypes } from '../../actions';
import { timer, Subject } from 'rxjs';
import { Vector2 } from 'app/core/models/common';
import { selectGravityConfig, selectAllGameObjects } from '../../selectors';
import { UpdateManyGameObjects } from '../../actions/game-objects.actions';
import { UpdateStr } from '@ngrx/entity/src/models';
import { GameObject } from '../../../core';

@Injectable()
export class GravityEffects implements OnDestroy {

  private destroy$ = new Subject<void>();
  private gravity: Vector2;

  constructor(
    private actions$: Actions,
    private store: Store<GameState>,
  ) {
    timer(0, 100).subscribe(() => {
      if (this.gravity && (this.gravity.x !== 0 || this.gravity.y !== 0)) {
        this.store.dispatch(new ApplyGravityToGameObjects());
      }
    });

    this.store.select(selectGravityConfig)
      .subscribe((gravity) => {
        this.gravity = gravity;
      });
  }

  @Effect()
  applyGravityToGameObjects$ = this.actions$
    .pipe(
      ofType<ApplyGravityToGameObjects>(GravityActionTypes.APPLY_TO_GAME_OBJECTS),
      withLatestFrom(this.store.select(selectAllGameObjects)),
      map(([_, gameObjects]) => {
        const changes: UpdateStr<GameObject>[] = gameObjects
          .filter((gameObject) => gameObject.isKinematic)
          .map((gameObject) => ({
            id: gameObject.id,
            changes: {
              position: {
                x: gameObject.position.x + this.gravity.x,
                y: gameObject.position.y + this.gravity.y,
              },
            },
          }));
        return new UpdateManyGameObjects(changes);
      }),
    );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
