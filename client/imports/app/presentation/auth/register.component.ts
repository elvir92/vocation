import {Component, NgZone, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { User } from '../../../../../imports/models/user'
import {errorMessages,regExps} from '../../../../../imports/models/validationModule'

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  userRegistrationForm: FormGroup;
  errors = errorMessages;

  constructor(private formBuilder: FormBuilder,private router: Router, private zone: NgZone) {
    this.createForm(new User());
  }

  createForm(user: User) {

    this.userRegistrationForm = this.formBuilder.group({
      name:  [user.name, Validators.compose([Validators.required,
        Validators.minLength(1),  Validators.maxLength(128)])],

      email:[ user.email, Validators.compose([ Validators.required,
        Validators.email])
      ],
      password:[ user.password,Validators.compose([ Validators.required,
        Validators.pattern(regExps.password)])
        ],
      description: [ user.description,[Validators.required,]
      ],
    });
    this.userRegistrationForm.reset();

  }
  register(user){
    this.signup(user);
 }
 signup(user) {
         Accounts.createUser({
             email: user.email,
             password: user.password,
             name: user.name,
             description: user.description,
             profile: {
                 type: 0
             }
         }, (err) => {
             console.log(err);
             if (err) {
                 this.zone.run(() => {
                     this.error = err;
                 });
             } else {
                 Meteor.loginWithPassword(user.email, user.password, (err) => {
                     this.zone.run(() => {
                         if (err) {
                             this.error = err;
                         } else {
                             this.router.navigate(['/backend/dashboard']);
                         }
                     });
                 });
             }
         });
 }
}
