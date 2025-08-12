import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, catchError, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { StateService } from '../../services/state.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-city-search',
  standalone: false,
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss'
})
export class CitySearch {
  cityControl = new FormControl('');
  loading = false;
  error: string | null = null;

  constructor(
    private weatherService: WeatherService,
    private stateService: StateService
  ) { }

  onSearch(city?: string) {
    const term = city ?? this.cityControl.value;
    if (!term) return;

    this.loading = true;
    this.error = null;

    this.weatherService.fetchWeather(term).pipe(
      tap(data => {
        this.stateService.setWeather(data);
        this.stateService.addHistory(term);
        this.loading = false;
      }),
      catchError(err => {
        this.loading = false;
        this.error = 'Could not fetch weather. Try again.';
        return of(null);
      })
    ).subscribe();
  }
}
