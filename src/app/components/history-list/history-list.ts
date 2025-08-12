import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-history-list',
  standalone: false,
  templateUrl: './history-list.html',
  styleUrl: './history-list.scss'
})
export class HistoryList {
  history$: Observable<string[]>;

  constructor(private stateService: StateService) {
    this.history$ = this.stateService.history$;
  }

  onCityClick(city: string) {
    // Optionally re-trigger search or just set weather
    this.stateService.addHistory(city);
  }
}
