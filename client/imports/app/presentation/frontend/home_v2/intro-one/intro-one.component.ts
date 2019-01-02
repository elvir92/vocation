import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import { MeteorObservable } from 'meteor-rxjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'app-intro',
  templateUrl: './intro-one.component.html',
  styleUrls: ['./intro-one.component.scss']
})
export class IntroOneComponent implements OnInit, OnDestroy {  
  @Output() onSearchSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() {    
  }

  ngOnDestroy() {
  }

  onSearch(filter) {
   this.onSearchSubmit.emit(filter);
  }
}
