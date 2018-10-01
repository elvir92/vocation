import {Component, NgZone, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']    
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string;

    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
    }

    login() {
        if (this.loginForm.valid) {
            Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
                this.zone.run(() => {
                    if (err) {
                        this.error = err;
                        console.log(this.error);
                    } else {
                        const currentUser = Meteor.user();
                        if (currentUser.profile && currentUser.profile.type && currentUser.profile.type == 0) {
                            this.router.navigate(['/admin/places']);
                        } else {
                            this.router.navigate(['/dashboard']);
                        }
                    }
                });
            });
        } else {
            this.error = "Your form isn't valid.";
        }
    }

    dismissError() {
        this.error = '';
    }
}