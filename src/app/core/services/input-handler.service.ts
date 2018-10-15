import {
  Injectable,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../store/models';
import { selectAllGameObjects } from '../../store/selectors';
import { GameObject } from '../models';
import { SetGameObjectSpeed } from '../../store/actions/game-objects.actions';

interface ActiveEvents {
  [key: string]: boolean;
}

@Injectable()
export class InputHandler {

  private activeEvents: ActiveEvents = {};
  private playerObject: GameObject;

  constructor(
    private store: Store<GameState>,
  ) {
    window.addEventListener('keypress', this.handleKeyPress.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.store.select(selectAllGameObjects)
      .subscribe((gameObjects) => {
        this.playerObject = gameObjects[0];
      });
  }

  handleKeyPress(event: KeyboardEvent) {
    const { key } = event;
    this.activeEvents[key] = true;
    switch (key) {
      case 'w':
        this.activeEvents['s'] = false;
        this.movePlayer(this.playerObject, null, -5);
        break;
      case 's':
        this.activeEvents['w'] = false;
        this.movePlayer(this.playerObject, null, 5);
        break;
      case 'a':
        this.activeEvents['d'] = false;
        this.movePlayer(this.playerObject, -5, null);
        break;
      case 'd':
        this.activeEvents['a'] = false;
        this.movePlayer(this.playerObject, 5, null);
        break;
      default:
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const { key } = event;
    if (this.activeEvents[key]) {
      this.activeEvents[key] = false;
      switch (key) {
        case 'w':
          this.stopPlayer(this.playerObject, false, true);
          break;
        case 's':
          this.stopPlayer(this.playerObject, false, true);
          break;
        case 'a':
          this.stopPlayer(this.playerObject, true, false);
          break;
        case 'd':
          this.stopPlayer(this.playerObject, true, false);
          break;
        default:
      }
    }
  }

  movePlayer(player: GameObject, x: number, y: number) {
    if (player) {
      this.store.dispatch(new SetGameObjectSpeed({
        gameObject: player,
        speed: {
          x: x || player.speed.x,
          y: y || player.speed.y,
        },
      }));
    }
  }

  stopPlayer(player: GameObject, x: boolean, y: boolean) {
    if (player) {
      this.store.dispatch(new SetGameObjectSpeed({
        gameObject: player,
        speed: {
          x: x ? 0 : player.speed.x,
          y: y ? 0 : player.speed.y,
        },
      }));
    }
  }
}
