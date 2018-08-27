import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-item-detail',
  template: `
  <mat-toolbar color="primary">
    <a mat-icon-button href="/{{category}}"><mat-icon>chevron_left</mat-icon></a>
    <span>&nbsp;</span>
    Star Wars Guide
  </mat-toolbar>
  <div class="container" fxLayout="row wrap">
    <mat-card>
      <img mat-card-image [src]="showUrl()">
    </mat-card>
    <app-person-detail *ngIf="category === 'characters'"></app-person-detail>
    <app-film-detail *ngIf="category === 'films'"></app-film-detail>
    <app-starship-detail *ngIf="category === 'starships'"></app-starship-detail>
    <app-vehicle-detail *ngIf="category === 'vehicles'"></app-vehicle-detail>
    <app-planet-detail *ngIf="category === 'planets'"></app-planet-detail>
    <app-species-detail *ngIf="category === 'species'"></app-species-detail>
  </div>
  `,
})
export class ItemDetailComponent implements OnInit {
  category: string;
  item: any;
  id: string;

  constructor(
    private swapiService: SwapiService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.params.category;
    this.id = this.activatedRoute.snapshot.params.id;
    this.swapiService
      .getItemDetail(this.category, this.id)
      .subscribe(result => {
        this.item = result;
      });
  }

  showUrl() {
    return `https://starwars-visualguide.com/assets/img/${this.category}/${
      this.id
    }.jpg`;
  }
}
