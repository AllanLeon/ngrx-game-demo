import { Component, OnInit, ViewChild, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameObjectManager } from 'app/core';
import { GameState, UpdateGravity } from 'app/store';
import { AddGameObject } from '../store/actions/game-objects.actions';
import { Circle } from '../core/models/';
import { timer } from 'rxjs';

@Component({
  selector: 'nge-canvas',
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements OnInit, AfterContentInit {

  @ViewChild('canvas', { read: ViewContainerRef }) canvas: ViewContainerRef;

  constructor(
    private store: Store<GameState>,
    private gameObjectManager: GameObjectManager,
  ) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.gameObjectManager.setCanvas(this.canvas);
    const circle1 = new Circle('./assets/sprites/goomba.png', 0, 0, 10);
    circle1.speed = { x: 5, y: 3 };
    this.store.dispatch(new AddGameObject(circle1));
    this.store.dispatch(new AddGameObject(new Circle('./assets/sprites/thwomp.png', 200, 100, 40)));
    // this.store.dispatch(new UpdateGravity({ x: 0, y: 5 }));
    // timer(5000).subscribe(() => {
    //   this.store.dispatch(new UpdateGravity({ x: 10, y: 1 }));
    // });
  }

}
