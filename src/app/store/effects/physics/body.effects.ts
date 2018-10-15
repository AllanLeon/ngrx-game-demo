import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { GameState } from '../../models';
import { ApplySpeedToGameObjects, BodyActionTypes, CheckCollisionBetweenGameObjects } from '../../actions';
import { timer, Subject } from 'rxjs';
import { selectAllGameObjects } from '../../selectors';
import { CollisionHandler } from 'app/core/services';
import { UpdateStr } from '@ngrx/entity/src/models';
import { GameObject } from '../../../core';
import { UpdateManyGameObjects, RevertManyGameObjects } from '../../actions/game-objects.actions';

@Injectable()
export class BodyEffects implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private actions$: Actions,
    private store: Store<GameState>,
    private collisionHandler: CollisionHandler,
  ) {
    timer(0, 100).subscribe((x) => {
      this.store.dispatch(new ApplySpeedToGameObjects());
      this.store.dispatch(new CheckCollisionBetweenGameObjects());
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

    @Effect()
    checkCollisionBetweenGameObjects$ = this.actions$
      .pipe(
        ofType<CheckCollisionBetweenGameObjects>(BodyActionTypes.CHECK_COLLISION_BETWEEN_GAME_OBJECTS),
        withLatestFrom(this.store.select(selectAllGameObjects)),
        map(([_, gameObjects]) => {
          const objectsToRevert: GameObject[] = [];
          gameObjects.forEach((object1, index) => {
            for (let i = index + 1; i < gameObjects.length; i++) {
              const object2 = gameObjects[i];
              if (this.collisionHandler.checkCollision(object1, object2)) {
                objectsToRevert.push(object1);
                break;
              }
            }
          });
          return new RevertManyGameObjects(objectsToRevert);
        }),
      );

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
