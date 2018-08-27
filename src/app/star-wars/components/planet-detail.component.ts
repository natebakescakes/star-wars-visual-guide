import { Component, OnInit } from '@angular/core';
import { ItemDetailComponent } from './item-detail.component';
import { SwapiService } from '../../services/swapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-detail',
  template: '',
})
export class PlanetDetailComponent extends ItemDetailComponent
  implements OnInit {
  constructor(swapiService: SwapiService, activatedRoute: ActivatedRoute) {
    super(swapiService, activatedRoute);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
