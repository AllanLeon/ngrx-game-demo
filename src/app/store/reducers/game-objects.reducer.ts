import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { /* GameObjectEntity */ GameObjectsState } from '../models';
import { GameObjectsActionsUnion, GameObjectsActionTypes } from '../actions/game-objects.actions';
import { GameObject } from '../../core';

export const adapter: EntityAdapter<GameObject> = createEntityAdapter<GameObject>(
  {
    selectId: (gameObjectEntity) => gameObjectEntity.id,
  }
);

const initialState: GameObjectsState = adapter.getInitialState({});

export function gameObjectsReducer(
  state: GameObjectsState = initialState,
  action: GameObjectsActionsUnion,
): GameObjectsState {
  switch (action.type) {
    case GameObjectsActionTypes.ADD_OBJECT: {
      // const gameObjectEntity: GameObject = {
      //   id: generateId(),
      //   gameObject: action.payload.gameObject,
      // };
      const newState = adapter.addOne(action.payload, state);
      return newState;
    }

    case GameObjectsActionTypes.REMOVE_OBJECT: {
      const newState = adapter.removeOne(action.payload.id, state);
      return newState;
    }

    case GameObjectsActionTypes.UPDATE_OBJECT_SUCCESS: {
      const newState = adapter.updateOne(action.payload, state);
      return newState;
    }

    case GameObjectsActionTypes.UPDATE_MANY_OBJECTS_SUCCESS: {
      const newState = adapter.updateMany(action.payload.updates, state);
      return newState;
    }

    default: {
      return state;
    }
  }
}

// function generateId() {
//   const S4 = function() {
//     // tslint:disable-next-line:no-bitwise
//     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//   };
//   return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
// }
