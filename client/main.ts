import './imports/polyfills';
import './imports/vendor/pace/pace.min.js';

import {Meteor} from 'meteor/meteor';
import 'hammerjs';

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './imports/app/app.module';

Meteor.startup(() => {
    if (Meteor.isProduction) {
        enableProdMode();
    }

    /*
    const subscription = MeteorObservable.autorun().subscribe(() => {
    if (Meteor.loggingIn()) {
        return;
    }
    setTimeout(() => subscription.unsubscribe());
    // platformBrowserDynamic().bootstrapModule(AppModule);
    });
    */
    platformBrowserDynamic().bootstrapModule(AppModule);

});
