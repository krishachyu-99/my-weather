import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '284985f3c8b4f94f50d9e01c0c617bbf';
  private apiURL = 'https://api.openweathermap.org/data/3.0/onecall';

  constructor(private http: HttpClient) {}

  fetchWeather(city: string): Observable<WeatherData> {
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
