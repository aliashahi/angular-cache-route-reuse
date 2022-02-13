import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppContainer } from './app.container';
import { CacheRouteReuseStrategy } from './services/cache-route.service';
import { CacheSaveService } from './services/cache-save.service';

@NgModule({
  declarations: [AppContainer, AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy,
    },
    CacheSaveService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
