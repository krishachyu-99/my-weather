import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state.service';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-weather-display',
  standalone: false,
  templateUrl: './weather-display.html',
  styleUrl: './weather-display.scss'
})
export class WeatherDisplay {
  weather$: Observable<WeatherData | null>;
  
  constructor(private stateService: StateService) {
    this.weather$ = this.stateService.weather$;
  }

  getSuggestion(w: WeatherData): string {
    if (w.condition.includes('rain')) return 'Take an umbrella';
    if (w.temperature < 10) return 'Wear a jacket';
    if (w.temperature > 25) return 'Sunglasses suggested';
    return 'Dress comfortably';
  }

}
