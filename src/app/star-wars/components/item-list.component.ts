import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetail } from '../../models/ItemDetail';
import { ListResult } from '../../models/ListResult';
import { SwapiService } from '../../services/swapi.service';

@Component({
  selector: 'app-item-list',
  template: `
    <mat-toolbar color="primary">
      <a mat-icon-button href=""><mat-icon>chevron_left</mat-icon></a>
      <span>&nbsp;</span> {{ category | titlecase }}
    </mat-toolbar>
    <div class="container" fxLayout="column wrap" fxLayoutGap="10px">
      <a href="{{ showLink(i) }}" *ngFor="let i of fullList">
        <mat-card>
          <mat-card-header>
            <mat-card-title> {{ showName(i) }} </mat-card-title>
            <img mat-card-avatar [src]="showImageUrl(i)" />
          </mat-card-header>
        </mat-card>
      </a>
      <mat-card *ngIf="loading" id="loading-card">
        <p><mat-spinner></mat-spinner></p>
        <p>Loading more...</p>
      </mat-card>
    </div>
  `,
  styles: ['']
})
export class ItemListComponent implements OnInit {
  fullList: any[] = [];
  listResult: ListResult;
  category: string;
  currentPage: number;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit() {
    this.category = this.activatedRoute.snapshot.params.category;
    this.currentPage = 1;

    this.swapiService
      .getItemList(this.category, this.currentPage)
      .subscribe(result => {
        this.listResult = result;
        this.fullList = this.fullList.concat(result.results);
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    // if scroll position is bottom of window, and not currently loading and there are next pages
    if (pos === max && !this.loading && this.listResult.next) {
      console.log('loading...');
      this.loading = true;
      this.currentPage += 1;
      this.swapiService
        .getItemList(this.category, this.currentPage)
        .subscribe(result => {
          console.log('loading complete');
          this.listResult = result;
          this.fullList = this.fullList.concat(result.results);
          console.log(this.fullList);
          this.loading = false;
        });
    }
  }
}
