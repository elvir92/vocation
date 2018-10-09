import { MeteorObservable } from 'meteor-rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {IProfile} from '../../../../../../imports/models';

@Component({
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})

export class MyProfileComponent implements OnInit, OnDestroy {

    userEditForm: FormGroup;
    error: string;
    currentUser: any;
    
    profile: IProfile;

    constructor(private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.currentUser = Meteor.user();

        this.userEditForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            description: ['', Validators.required],
            phone: ['', Validators.required],
            facebook_link: ['', Validators.required],
            twitter_link: ['', Validators.required],
            instagram_link: ['', Validators.required]
        });

        this.error = '';
    }
  
    ngOnDestroy() {
        
    }

    //To save data on server
    onSave() {
        if (this.userEditForm.valid) {
            this.profile = this.userEditForm.value;
            MeteorObservable.call('updateProfile', this.profile).subscribe({
                next: () => {
                    this.router.navigate(['dashboard']);
                },
                error: (e: Error) => {
                    console.log(e);
                }
            });
        } 
    }

}
