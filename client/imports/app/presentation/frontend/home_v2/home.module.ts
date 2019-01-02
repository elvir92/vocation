import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatInputModule,
  MatRippleModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatOptionModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
// import { CommonDirectivesModule } from '../../directives/common/common-directives.module';
import { SharedModule } from '../_layout/shared/shared.module';
import { HomeRoutes } from "./home.routing";

import { HomeOneComponent } from './home-one.component';
import { HomeTwoComponent } from './home-two.component';
import { HeaderComponent } from './header/header.component';
import { IntroOneComponent } from './intro-one/intro-one.component';
import { IntroTwoComponent } from './intro-two/intro-two.component';
import { ServicesComponent } from './services/services.component';
import { CtaComponent } from './cta/cta.component';
import { PricingsComponent } from './pricings/pricings.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { PortfolioCarouselComponent } from './portfolio-carousel/portfolio-carousel.component';
import { TestimonialsCarouselComponent } from './testimonials-carousel/testimonials-carousel.component';
import { ServicesCarouselComponent } from './services-carousel/services-carousel.component';
import { DemoComponent } from './demo/demo.component';
import { AllSectionsComponent } from './all-sections.component';

import { RentalsSearchComponent } from '../shared/rentals-search/rentals-search.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { RentDetailsDialog } from './apartments/rent-details-dialog.component';

import { WINDOW_PROVIDERS } from '../_layout/shared/helpers/window.helper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FlexLayoutModule,
    NguCarouselModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatSelectModule,
    MatNativeDateModule,
    RouterModule.forChild(HomeRoutes)
  ],
  entryComponents: [RentDetailsDialog],
  declarations: [
    HomeOneComponent,
    HomeTwoComponent, 
    HeaderComponent, 
    IntroOneComponent,
    IntroTwoComponent, 
    ApartmentsComponent, 
    ServicesComponent, 
    CtaComponent, 
    PricingsComponent, 
    ContactComponent, 
    FooterComponent, 
    TestimonialsComponent, 
    PortfolioCarouselComponent,  
    TestimonialsCarouselComponent, 
    ServicesCarouselComponent, 
    DemoComponent,
    AllSectionsComponent,
    RentalsSearchComponent,
    RentDetailsDialog
  ],
  providers: [WINDOW_PROVIDERS]

})
export class HomeModule { }
