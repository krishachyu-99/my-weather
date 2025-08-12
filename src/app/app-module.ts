import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CitySearch } from './components/city-search/city-search';
import { WeatherDisplay } from './components/weather-display/weather-display';
import { HistoryList } from './components/history-list/history-list';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';

@NgModule({
  declarations: [
    App,
    CitySearch,
    WeatherDisplay,
    HistoryList,
    ThemeToggle
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
