import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})

export class MyProfileComponent implements OnInit, OnDestroy {

    userEditForm: FormGroup;
    error: string;
    currentUser: any;


    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.currentUser = Meteor.user();
        console.log("CUrrent user, " this.currentUser)

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

}
