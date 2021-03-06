import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameObjectManager, CollisionHandler, InputHandler } from './services';
import { CircleComponent } from '../shared/components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    GameObjectManager,
    CollisionHandler,
    InputHandler,
  ],
  entryComponents: [
    CircleComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
