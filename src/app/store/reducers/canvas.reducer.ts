import { ViewContainerRef } from '@angular/core';
import { CanvasActionTypes, CanvasActionsUnion } from '../actions';
import { PhysicsConfig, CanvasConfig } from '../models';

const initialState: CanvasConfig = {
  ref: null,
};

export function canvasReducer(
  state: CanvasConfig = initialState,
  action: CanvasActionsUnion,
): CanvasConfig {
  switch (action.type) {
    case CanvasActionTypes.SET: {
      return {
        ...state,
        ref: action.payload.canvas,
      };
    }

    default: {
      return state;
    }
  }
}
