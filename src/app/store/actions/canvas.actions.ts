import { ViewContainerRef } from '@angular/core';
import { Action } from '@ngrx/store';

export enum CanvasActionTypes {
  SET = '[Canvas] Set',
}

export class SetCanvas implements Action {
  readonly type = CanvasActionTypes.SET;

  constructor(public payload: { canvas: ViewContainerRef }) {}
}

export type CanvasActionsUnion =
  | SetCanvas;
