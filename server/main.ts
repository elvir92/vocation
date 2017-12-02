import {Meteor} from 'meteor/meteor';
import {loadListGroupsAndLists} from "./imports/fixtures/lists_groups";
import {loadPlaces} from "./imports/fixtures/places";
import {loadLengthUnits} from "./imports/fixtures/length-unit";

import './imports/publications/listing';
import './imports/publications/lists';
import './imports/publications/lists_groups';
import './imports/publications/length_units';
import './imports/publications/places';
import './imports/publications/properties';
import './imports/publications/pictures';

import './imports/methods/lists_groups';
import './imports/methods/lists';
import './imports/methods/length_units';
import './imports/methods/places';
import './imports/methods/pictures';
import './imports/methods/properties';


Meteor.startup(() => {
    // code to run on server at startup
    loadListGroupsAndLists();
    loadPlaces();
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
