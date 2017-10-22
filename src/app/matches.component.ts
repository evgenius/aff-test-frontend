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

const LOCATIONS = [
  { "name": "London", "lat": 51.509865, "lon": -0.118092 },
  { "name": "Leeds", "lat": 53.801277, "lon": -1.548567 },
  { "name": "Solihull", "lat": 52.412811, "lon": -1.778197 },
  { "name": "Cardiff", "lat": 51.481583, "lon": -3.179090 },
  { "name": "Eastbourne", "lat": 50.768036, "lon": 0.290472 },
  { "name": "Swindon", "lat": 51.568535, "lon": -1.772232 },
  { "name": "Oxford", "lat": 51.752022, "lon": -1.257677 },
  { "name": "Salisbury", "lat": 51.068787, "lon": -1.794472 },
  { "name": "Weymouth", "lat": 50.614429, "lon": -2.457621 },
  { "name": "Bournemouth", "lat": 50.720806, "lon": -1.904755 },
  { "name": "Plymouth", "lat": 50.376289, "lon": -4.143841 },
  { "name": "Inverness", "lat": 57.477772, "lon": -4.224721 },
  { "name": "Aberdeen", "lat": 57.149651, "lon": -2.099075 },
  { "name": "Ayr", "lat": 55.458565, "lon": -4.629179 },
  { "name": "Belfast", "lat": 54.607868, "lon": -5.926437 },
  { "name": "Londonderry", "lat": 55.006763, "lon": -7.318268 },
  { "name": "Harlow", "lat": 51.772938, "lon": 0.102310 },
];

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
  locations = LOCATIONS;

  comp: SliderRange;
  age: SliderRange;
  height: SliderRange;
  distance: SliderRange;
  location = LOCATIONS[0];

  filtersPanelExpanded: boolean = false;

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
    let filters = [];
    if (this.enablePhotoFilter) {
      filters.push(new PhotoFilter());
    }
    if (this.enableContactFilter) {
      filters.push(new ContactFilter());
    }
    if (this.enableFavouriteFilter) {
      filters.push(new FavouriteFilter());
    }
    if (this.comp) {
      filters.push(new CompatibilityFilter(this.comp.from, this.comp.to));
    }
    if (this.age) {
      filters.push(new AgeFilter(this.age.from, this.age.to));
    }
    if (this.distance) {
      filters.push(new DistanceFilter(
        this.location.lat,
        this.location.lon,
        DISTANCES[this.distance.from]));
    }
    this.matchService.getMatches(filters)
      .then(matches => this.matches = matches);
  }
  collapseFilters(): void {
    this.filtersPanelExpanded = false;
    this.scrollToTop();
  }
  scrollToTop(): void {
    (function () {
      window.scrollTo(0, 0);
    })();
  }
  onSelect(match: Match): void {
    this.selectedMatch = match;
  }
  onFilterClick(): void {
    this.collapseFilters();
    this.getMatches();
  }
  onLocationChange(): void {
    this.getMatches();
  }
}
