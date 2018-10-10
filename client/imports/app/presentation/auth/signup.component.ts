import {Component, NgZone, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Accounts} from 'meteor/accounts-base';


@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./login.component.scss']    
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    error: string;

    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            username: ['', Validators.required],
            description: ['', Validators.required],
            phone: ['', Validators.required],
            facebook_link: ['', Validators.required],
            twitter_link: ['', Validators.required],
            instagram_link: ['', Validators.required]
        });
        this.error = '';
    }

    signup() {
        if (this.signupForm.valid) {
            Accounts.createUser({
                email: this.signupForm.value.email,
                password: this.signupForm.value.password,
                profile: {
                    first_name: this.signupForm.value.first_name,
                    last_name: this.signupForm.value.last_name,
                    username: this.signupForm.value.username,
                    description: this.signupForm.value.description,
                    phone: this.signupForm.value.phone,
                    facebook_link: this.signupForm.value.facebook_link,
                    twitter_link: this.signupForm.value.twitter_link,
                    instagram_link: this.signupForm.value.instagram_link
                }
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
                                this.router.navigate(['/dashboard']);
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