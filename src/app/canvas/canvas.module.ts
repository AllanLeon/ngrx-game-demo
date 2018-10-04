import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { routing } from './canvas.routing';
import { CanvasComponent } from './canvas.component';
import { CircleComponent } from '../shared/components';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ],
  declarations: [
    CanvasComponent,
  ],
  providers: [],
  entryComponents: [
    CircleComponent,
  ]
})
export class CanvasModule { }
