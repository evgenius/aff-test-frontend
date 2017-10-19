import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { Match } from './match'
import { MatchService } from './match.service';
import { Filter, PhotoFilter, ContactFilter, FavouriteFilter } from './filter'

@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [MatchService]
})

export class MatchesComponent implements OnInit {
  matches: Match[];
  selectedMatch: Match;
  enablePhotoFilter: boolean = false;
  enableContactFilter: boolean = false;
  enableFavouriteFilter: boolean = false;
  filters: Filter[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.getMatches();
  }
  getMatches(): void {
    this.matchService.getMatches(this.filters)
      .then(matches => this.matches = matches);
  }
  onSelect(match: Match): void {
    this.selectedMatch = match;
  }
  onFilterClick(): void {
    this.filters = [];
    if (this.enablePhotoFilter) {
      this.filters.push(new PhotoFilter());
    }
    if (this.enableContactFilter) {
      this.filters.push(new ContactFilter());
    }
    if (this.enableFavouriteFilter) {
      this.filters.push(new FavouriteFilter());
    }
    this.getMatches();
  }
}
