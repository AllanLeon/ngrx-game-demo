import { createSelector } from '@ngrx/store';
import { GameState, PhysicsConfig, GameConfig } from '../models';

export const selectGameConfig = (state: GameState) => state.gameConfig;

export const selectPhysicsConfig = createSelector(
  selectGameConfig,
  (state: GameConfig) => state.physics,
);

export const selectGravityConfig = createSelector(
  selectPhysicsConfig,
  (state: PhysicsConfig) => state.gravity,
);
