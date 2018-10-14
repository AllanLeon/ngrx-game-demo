import { Component, OnInit, ViewChild, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameObjectManager } from 'app/core';
import { GameState, UpdateGravity } from 'app/store';
import { AddGameObject } from '../store/actions/game-objects.actions';
import { Circle } from '../core/models/objects/circle.model';
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
    this.store.dispatch(new AddGameObject(new Circle(10, 10, 20)));
    this.store.dispatch(new AddGameObject(new Circle(100, 50, 40)));
    this.store.dispatch(new UpdateGravity({ x: 0, y: 5 }));
    timer(5000).subscribe(() => {
      this.store.dispatch(new UpdateGravity({ x: 10, y: 1 }));
    });
  }

}
