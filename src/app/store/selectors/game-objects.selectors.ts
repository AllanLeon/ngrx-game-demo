import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/game-objects.reducer';
import { GameState } from '../models';

const {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities,
} = adapter.getSelectors();

export const selectGameObjects = (state: GameState) => state.gameObjects;

export const selectAllGameObjects = createSelector(
  selectGameObjects,
  selectAll,
);

export const selectGameObjectsIds = createSelector(
  selectGameObjects,
  selectIds,
);

export const selectTotalGameObjects = createSelector(
  selectGameObjects,
  selectTotal,
);

export const selectGameObjectsEntities = createSelector(
  selectGameObjects,
  selectEntities,
);
