import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Match } from './match'
import { Filter } from './filter'

@Injectable()
export class MatchService {
  private endpoint = 'http://localhost:8080';

  constructor(private http: Http) {}

  private getEndpoint(path): string {
    return this.endpoint + path;
  }

  getMatches(filters: Filter[]): Promise<Match[]> {
    var params = new URLSearchParams();
    for (var filter of filters) {
      params.append('filter', filter.getValue());
    }
    return this.http.get(this.getEndpoint('/api/match'), { params })
      .toPromise()
      .then(response => response.json().data as Match[])
      .catch(this.handleError)
  }
  getComments(userId: number): Promise<any> {
    return this.http.get(this.getEndpoint(`/api/comments/${userId}`))
      .toPromise()
      .then(response => response.json().data as string[]);
  }
  postComment(userId: number, message: string): Promise<any> {
    const body = { message };
    return this.http.post(this.getEndpoint(`/api/comments/${userId}`), body)
      .toPromise();
  }
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
