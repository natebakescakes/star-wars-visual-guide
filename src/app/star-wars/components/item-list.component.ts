import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetail } from '../../models/ItemDetail';
import { ListResult } from '../../models/ListResult';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-item-list',
  template: `
  <mat-toolbar color="primary">
    <a mat-icon-button href="/"><mat-icon>chevron_left</mat-icon></a>
    <span>&nbsp;</span>
    {{category | titlecase}}
  </mat-toolbar>
  <div class="container" fxLayout="column wrap" fxLayoutGap="10px">
    <a href="{{showLink(i)}}" *ngFor="let i of listResult?.results">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            {{showName(i)}}
          </mat-card-title>
          <img mat-card-avatar [src]="showImageUrl(i)">
        </mat-card-header>
      </mat-card>
    </a>
  </div>
  `
})
export class ItemListComponent implements OnInit {
  listResult: ListResult;
  category: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.params.category;

    this.swapiService.getItemList(this.category).subscribe(result => {
      this.listResult = result;
    });
  }

  showName(item: any) {
    if (this.category === 'films') {
      return item.title;
    } else {
      return item.name;
    }
  }

  showLink(item: any) {
    const itemDetail = item as ItemDetail;
    const id = /(\d+)\//g.exec(itemDetail.url)[1];
    return `/${this.category}/${id}`;
  }

  showImageUrl(item: any) {
    const itemDetail = item as ItemDetail;
    const id = /(\d+)\//g.exec(itemDetail.url)[1];
    return `https://starwars-visualguide.com/assets/img/${
      this.category === 'people' ? 'characters' : this.category
    }/${id}.jpg`;
  }
}
