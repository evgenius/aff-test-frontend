import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { Match } from './match'
import { MatchService } from './match.service';
import { Filter, PhotoFilter, ContactFilter, FavouriteFilter,
         CompatibilityFilter, AgeFilter, DistanceFilter } from './filter'

import { SliderRange } from './modules/slider/range';
import { MatchDetailsDialog } from './match-details.component';

declare var jquery: any;
declare var $: any;

var MIN_AGE = 18;
var MAX_AGE = 95;

var MIN_COMP = 1;
var MAX_COMP = 99;

var MIN_HEIGHT = 135;
var MAX_HEIGHT = 210;

var AGES = {};
for (var i = MIN_AGE; i <= MAX_AGE; i++) {
  AGES[i] = i;
}
AGES['> ' + MAX_AGE] = -1;

var COMPS = {};
for (var i = MIN_COMP; i <= MAX_COMP; i++) {
  COMPS[i + '%'] = i;
}

var HEIGHTS = {};
HEIGHTS['< ' + MIN_HEIGHT + ' cm'] = 0;
for (var i = MIN_HEIGHT; i <= MAX_HEIGHT; i++) {
  HEIGHTS[i + ' cm'] = i;
}
HEIGHTS['> ' + MAX_HEIGHT + ' cm'] = -1;


var DISTANCES = {
  '< 30 km': 30,
  '100 km': 100,
  '200 km': 200,
  '300 km': 300,
  '> 300 km': -1,
};

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

  comps = Object.keys(COMPS);
  ages = Object.keys(AGES);
  heights = Object.keys(HEIGHTS);
  distances = Object.keys(DISTANCES);

  comp: SliderRange;
  age: SliderRange;
  height: SliderRange;
  distance: SliderRange;

  filters: Filter[] = [];

  constructor(private matchService: MatchService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMatches();
  }
  openDialog() {
    this.dialog.open(MatchDetailsDialog, {
      data: {
        match: this.selectedMatch
      }
    });
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
    if (this.comp) {
      this.filters.push(new CompatibilityFilter(this.comp.from, this.comp.to));
    }
    if (this.age) {
      this.filters.push(new AgeFilter(this.age.from, this.age.to));
    }
    if (this.distance) {
      this.filters.push(new DistanceFilter('0', '0', DISTANCES[this.distance.from]));
    }
    this.getMatches();
  }
}
