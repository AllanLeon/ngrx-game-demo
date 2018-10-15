import { Component, OnInit, ViewChild, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameObjectManager, InputHandler } from 'app/core/services';
import { GameState, UpdateGravity } from 'app/store';
import { AddGameObject } from '../store/actions/game-objects.actions';
import { Circle } from '../core/models/';

@Component({
  selector: 'nge-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements OnInit, AfterContentInit {

  @ViewChild('canvas', { read: ViewContainerRef }) canvas: ViewContainerRef;

  constructor(
    private store: Store<GameState>,
    private gameObjectManager: GameObjectManager,
    private inputHandler: InputHandler,
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.gameObjectManager.setCanvas(this.canvas);
    const goomba = new Circle('./assets/sprites/goomba.png', 0, 0, 10);
    const thwomp = new Circle('./assets/sprites/thwomp.png', 200, -40, 40);
    thwomp.isKinematic = true;
    this.store.dispatch(new AddGameObject(goomba));
    this.store.dispatch(new AddGameObject(thwomp));
    this.store.dispatch(new UpdateGravity({ x: 0, y: 1 }));
  }

}
