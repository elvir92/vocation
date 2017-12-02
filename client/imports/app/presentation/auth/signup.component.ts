import {Component, NgZone, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accounts} from 'meteor/accounts-base';


@Component({
    templateUrl: './signup.component.html',
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    error: string;

    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.error = '';
    }

    signup() {
        if (this.signupForm.valid) {
            Accounts.createUser({
                email: this.signupForm.value.email,
                password: this.signupForm.value.password
            }, (err) => {
                console.log(err);
                if (err) {
                    this.zone.run(() => {
                        this.error = err;
                    });
                } else {
                    Meteor.loginWithPassword(this.signupForm.value.email, this.signupForm.value.password, (err) => {
                        this.zone.run(() => {
                            if (err) {
                                this.error = err;
                            } else {
                                this.router.navigate(['/']);
                            }
                        });
                    });
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