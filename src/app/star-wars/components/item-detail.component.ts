import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import { Film } from '../../models/Film';
import { NonFilmDetail } from '../../models/ItemDetail';

@Component({
  selector: 'app-item-detail',
  template: `
  <mat-toolbar color="primary">
    <a mat-icon-button href="/{{category}}"><mat-icon>chevron_left</mat-icon></a>
    <span>&nbsp;</span>
    {{showName()}}
  </mat-toolbar>
  <div class="container" fxLayout="column wrap" fxLayoutGap="10px">
    <mat-card>
      <img mat-card-image [src]="showImageUrl()">
    </mat-card>
    <app-person-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'characters'"></app-person-detail>
    <app-film-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'films'"></app-film-detail>
    <app-starship-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'starships'"></app-starship-detail>
    <app-vehicle-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'vehicles'"></app-vehicle-detail>
    <app-planet-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'planets'"></app-planet-detail>
    <app-species-detail fxLayout="column wrap" fxLayoutGap="10px" *ngIf="category === 'species'"></app-species-detail>
  </div>
  `,
})
export class ItemDetailComponent implements OnInit {
  category: string;
  item: any;
  id: string;

  constructor(
    protected swapiService: SwapiService,
    protected activatedRoute: ActivatedRoute,
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

  showImageUrl() {
    return `https://starwars-visualguide.com/assets/img/${
      this.category === 'people' ? 'characters' : this.category
    }/${this.id}.jpg`;
  }

  showName() {
    if (!this.item) {
      return '';
    }

    if (this.category === 'films') {
      return this.item.title;
    }

    return this.item.name;
  }

  getReferencesFromUrl(url: string): any {
    const urlCategory = /(\w+)\/(\d+)\//g.exec(url)[1];
    const urlId = /(\w+)\/(\d+)\//g.exec(url)[2];
    const reference = { name: '', url: '', imageUrl: '' };

    this.swapiService.getItemDetail(urlCategory, urlId).subscribe(result => {
      if (urlCategory === 'films') {
        const film = result as Film;
        reference.name = film.title;
      } else {
        const nonFilm = result as NonFilmDetail;
        reference.name = nonFilm.name;
      }
    });

    reference.url = `${
      urlCategory === 'people' ? 'characters' : urlCategory
    }/${urlId}`;
    reference.imageUrl = `https://starwars-visualguide.com/assets/img/${
      urlCategory === 'people' ? 'characters' : urlCategory
    }/${urlId}.jpg`;

    return reference;
  }
}
