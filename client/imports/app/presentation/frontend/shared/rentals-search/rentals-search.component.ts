import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

const formatDate = "DDMMYYYY";

@Component({
    selector: 'rentals-search',
    styleUrls: ['./rentals-search.component.scss'],
    templateUrl: './rentals-search.component.html'
})

export class RentalsSearchComponent implements OnInit {
    searchForm: FormGroup;
    @Output() onSearchSubmit = new EventEmitter();

    constructor(private _fb: FormBuilder){
    }

    ngOnInit() {
        this.searchForm = this._fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            numberOfGuests: [''],
            searchControl: ['']
        }, {
            validator: Validators.compose([
                this.dateLessThan('startDate', 'endDate'),
                this.correctStartDate('startDate')
            ])
        });
    }

    dateLessThan(from: string, to: string) {
        return (group: FormGroup): {[key: string]: any} => {
         let f = group.controls[from];
         let t = group.controls[to];
         if (f.value > t.value) {
           return {
             dates: "Date from should be less than Date to"
           };
         }
         return {};
        }
    }

    correctStartDate(start: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let startDate = group.controls[start];
            if (moment(startDate.value).format(formatDate) < moment().format(formatDate)) {
                return {
                    dates: "Date from should be less than Date to"
                };
            }
            return {};
        }
    }

    searchSubmit() {
        const filter = {
            startDate: this.searchForm.value.startDate,
            endDate: this.searchForm.value.endDate,
            numOfGuests: this.searchForm.value.numberOfGuests,
            searchQuery: this.searchForm.value.searchControl
        };

        let isValid = this.checkIfDatesAreValid(filter.startDate, filter.endDate);
        if (isValid) {
            this.onSearchSubmit.emit(filter);
        } else {
            this.onSearchSubmit.emit({validation_error:true})
        }
    }


    private checkIfDatesAreValid(start, end): Boolean {
        if (!start || !end || moment(start).format(formatDate) < moment().format(formatDate) || moment(start) >= moment(end)) {
            return false;
        }
        return true;
    }
}
