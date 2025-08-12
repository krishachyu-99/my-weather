import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class StateService {
  private historySub = new BehaviorSubject<string[]>([]);
  private weatherSub = new BehaviorSubject<WeatherData | null>(null);

  get history$(): Observable<string[]> { return this.historySub.asObservable(); }
  get weather$(): Observable<WeatherData | null> { return this.weatherSub.asObservable(); }

  setWeather(data: WeatherData) {
    this.weatherSub.next(data);
  }

  addHistory(city: string) {
    const list = [city, ...this.historySub.getValue()].slice(0, 5);
    this.historySub.next(list);
  }
}
