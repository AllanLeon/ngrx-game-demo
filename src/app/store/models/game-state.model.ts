import { GameConfig } from './game-config.model';
import { GameObjectsState } from './game-objects.model';

export interface GameState {
  gameConfig: GameConfig;
  gameObjects: GameObjectsState;
}
