import { ActionReducerMap } from '@ngrx/store';

import { GameConfig } from '../models';
import { physicsConfigReducer } from './physics-config.reducer';
import { canvasReducer } from './canvas.reducer';

export * from './game-objects.reducer';
export const gameConfigReducers: ActionReducerMap<GameConfig> = {
  physics: physicsConfigReducer,
};
