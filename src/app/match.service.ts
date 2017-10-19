import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Match } from './match'
import { Filter } from './filter'

@Injectable()
export class MatchService {
  private endpoint = 'http://localhost:8080/api/match';

  constructor(private http: Http) {}

  getMatches(filters: Filter[]): Promise<Match[]> {
    var params = new URLSearchParams();
    for (var filter of filters) {
      params.append('filter', filter.getValue());
    }
    return this.http.get(this.endpoint, { params })
      .toPromise()
      .then(response => response.json().data as Match[])
      .catch(this.handleError)
  }
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
