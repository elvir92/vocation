import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontendTempRoutes} from "./front-temp.routing";
import {HomeTempComponent} from "./home/home-temp.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forChild(FrontendTempRoutes),
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    declarations: [
        HomeTempComponent,        
    ],
    providers:[
    ]
})

export class FrontTempModule {
}
