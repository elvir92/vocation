import {Meteor} from 'meteor/meteor';
import {loadListGroupsAndLists} from "./imports/fixtures/lists_groups";
import {loadPlaces} from "./imports/fixtures/places";
import {loadLengthUnits} from "./imports/fixtures/length-unit";
import {loadAdminUser} from "./imports/fixtures/users";
import {loadCities} from "./imports/fixtures/cities";

import './imports/publications/listing';
import './imports/publications/lists';
import './imports/publications/lists_groups';
import './imports/publications/length_units';
import './imports/publications/places';
import './imports/publications/properties';
import './imports/publications/pictures';
import './imports/publications/emails';
import './imports/publications/cities';

import './imports/methods/lists_groups';
import './imports/methods/lists';
import './imports/methods/length_units';
import './imports/methods/places';
import './imports/methods/pictures';
import './imports/methods/properties';
import './imports/methods/email';
import './imports/methods/cities';
import './imports/methods/users';

Meteor.startup(() => {
    // code to run on server at startup
    loadAdminUser();
    loadListGroupsAndLists();
    loadPlaces();
    loadCities();
    loadLengthUnits();

    if (Meteor.isServer) {
        //console.log(process.env.PWD);
        UploadServer.init({
            tmpDir: process.env.PWD + '/.uploads/tmp',
            uploadDir: process.env.PWD + '/.uploads',
            checkCreateDirectories: true,
            uploadUrl: '/upload/',
            getFileName: function (file, formData) {
                //console.log("getFileName called !! file : " + JSON.stringify(file));
                let extension = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
                return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '.' + extension;
                // we get this value in the ajax response
            }

        });
    }
});
