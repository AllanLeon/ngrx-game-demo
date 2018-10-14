import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { gameConfigReducers, gameObjectsReducer, GameObjectsEffects, GravityEffects, BodyEffects } from './store';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    StoreModule.forRoot({
      gameConfig: combineReducers(gameConfigReducers),
      gameObjects: gameObjectsReducer,
    }, {
      metaReducers: [storeFreeze],
    }),
    EffectsModule.forRoot([
      GameObjectsEffects,
      GravityEffects,
      BodyEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
