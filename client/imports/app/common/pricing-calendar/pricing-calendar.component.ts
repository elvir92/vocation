import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-pricing-calendar',
    templateUrl: './pricing-calendar.component.html',
    styleUrls: ['./pricing-calendar.component.scss']
})
export class PricingCalendarComponent {
    // @Input() place: IPlace;
    // @Input() lengthUnits: ILengthUnit[];

    @Input('group')
    public priceForm: FormGroup;

}