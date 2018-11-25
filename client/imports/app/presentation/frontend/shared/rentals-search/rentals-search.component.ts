import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'rentals-search',
    styleUrls: ['./rentals-search.component.scss'],
    templateUrl: './rentals-search.component.html'
})

export class RentalsSearchComponent implements OnInit {
    searchForm: FormGroup;
    @Output() filterValues = new EventEmitter();

    constructor(private _fb: FormBuilder){

    }

    ngOnInit() {
        this.searchForm = this._fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            numberOfGuests: [''],
            searchControl: [''], 
        });
    }

    searchActiveProperties() {
        const filter = {
            startDate: this.searchForm.value.startDate,
            endDate: this.searchForm.value.endDate,
            numOfGuests: this.searchForm.value.numberOfGuests,
            searchQuery: this.searchForm.value.searchControl
        };

        let isValid = this.checkIfDatesAreValid(filter.startDate, filter.endDate);
        if (isValid) {
            this.filterValues.emit(filter);
        }
    }


    private checkIfDatesAreValid(start, end): Boolean {
        if (!start || !end || new Date(start) <= new Date() || new Date(start) >= new Date(end)) {
            return false;
        }
        return true;
    }
}
