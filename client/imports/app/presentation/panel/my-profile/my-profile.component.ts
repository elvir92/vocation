import {MeteorObservable} from 'meteor-rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {IProfile} from '../../../../../../imports/models';

@Component({
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})

export class MyProfileComponent implements OnInit, OnDestroy {

    userEditForm: FormGroup;
    error: string;
    currentUser: any;

    //TODO: Use this property to load your current information about user. 
    // You can see inside mongo db how look user object. Basically it has profile property 
    // and inside property we can store all info about user, except password email, we don't need username field
    // Or google : Meteor.user to se object structure at meteor doc.
    
    // inside IProfile we can add all our custom properties
    profile: IProfile;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.currentUser = Meteor.user();
        console.log("Current user ", this.currentUser)

        this.userEditForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
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
        MeteorObservable.call('updateProfile', this.profile).subscribe({
            next: () => {
                //TODO: add notification toast or something similar [NOT IMPORTANT TODO]
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

}
