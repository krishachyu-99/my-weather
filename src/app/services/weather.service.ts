import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'YOUR_API_KEY_HERE';  // Replace with real key
  private apiURL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  fetchWeather(city: string): Observable<WeatherData> {
    // Real implementation:
    return this.http.get<any>(`${this.apiURL}?q=${city}&units=metric&appid=${this.apiKey}`)
      .pipe(
        map(res => ({
          temperature: res.main.temp,
          condition: res.weather[0].main.toLowerCase(),
          windSpeed: res.wind.speed,
          humidity: res.main.humidity
        })),
        catchError(err => {
          console.error(err);
          throw err;
        })
      );
  }

  // Optional mock for dev/test:
  mockFetch(city: string): Observable<WeatherData> {
    const mock: WeatherData = {
      temperature: 18,
      condition: 'rainy',
      windSpeed: 6,
      humidity: 80
    };
    return of(mock);
  }
}
