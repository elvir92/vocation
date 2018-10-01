import {Component, NgZone, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accounts} from 'meteor/accounts-base';


@Component({
    templateUrl: './recover.component.html',
    styleUrls: ['./login.component.scss']
})
export class RecoverComponent implements OnInit {
    recoverForm: FormGroup;
    error: string;

    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.recoverForm = this.formBuilder.group({
            email: ['', Validators.required]
        });

        this.error = '';
    }

    recover() {
        if (this.recoverForm.valid) {
            Accounts.forgotPassword({
                email: this.recoverForm.value.email
            }, (err) => {
                if (err) {
                    this.zone.run(() => {
                        this.error = err;
                    });
                } else {
                    this.router.navigate(['/']);
                }
            });
        } else {
            this.error = "Your form isn't valid.";
        }
    }

    dismissError() {
        this.error = '';
    }
}