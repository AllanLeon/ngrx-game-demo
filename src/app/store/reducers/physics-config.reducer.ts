import { PhysicsConfigActionTypes, PhysicsConfigActionsUnion } from '../actions';
import { PhysicsConfig } from '../models';

const initialState: PhysicsConfig = {
  gravity: {
    y: 10,
    x: 0,
  },
};

export interface PhysicsConfigState {
  physicsConfig: PhysicsConfig;
}

export function physicsConfigReducer(
  state: PhysicsConfig = initialState,
  action: PhysicsConfigActionsUnion,
): PhysicsConfig {
  switch (action.type) {
    case PhysicsConfigActionTypes.RESET: {
      return initialState;
    }

    case PhysicsConfigActionTypes.UPDATE_GRAVITY: {
      return {
        ...state,
        gravity: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
