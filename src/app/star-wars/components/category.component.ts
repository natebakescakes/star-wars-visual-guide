import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  template: `
  <mat-toolbar color="primary">Star Wars Guide</mat-toolbar>
  <div class="container" fxLayout="column wrap" fxLayoutGap="10px">
    <a href="/{{c | lowercase}}" *ngFor="let c of categories">
      <mat-card>
        <mat-card-title>
          {{c}}
        </mat-card-title>
      </mat-card>
    </a>
  </div>
  `,
})
export class CategoryComponent implements OnInit {
  categories: string[] = [
    'Characters',
    'Films',
    'Species',
    'Starships',
    'Vehicles',
    'Planets',
  ];

  constructor() {}

  ngOnInit() {}
}
