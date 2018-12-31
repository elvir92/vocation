import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LandingFixService } from '../_layout/shared/services/landing-fix.service';
import { IProperty } from 'imports/models';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html'
})
export class HomeOneComponent implements OnInit, OnDestroy {

  properties: IProperty[] = [];
  filterOn: boolean;

  constructor(
    private fix: LandingFixService
  ) { }

  ngOnInit() {
    this.fix.addFix();
  }
  ngOnDestroy() {
    this.fix.removeFix();
  }

  getFiltered(props) {
    this.filterOn = true;
    if (props.length > 0) {
      this.properties = props;
    } else {
      this.properties = [];
    }
  }
  

}
