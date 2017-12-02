import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MeteorObservable} from "meteor-rxjs";

import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import {IPicture} from "../../../../../imports/models";

@Component({
    selector: 'app-picture-upload',
    templateUrl: './picture-upload.component.html',
    styleUrls: ['./picture-upload.component.scss']
})

export class PictureUploadComponent implements OnDestroy {
    @Output() onFile: EventEmitter<string> = new EventEmitter<string>();

    config: DropzoneConfigInterface = {
        //addRemoveLinks: true,
        url: '/upload',
        maxFilesize: 50,
        acceptedFiles: 'image/*',
        clickable: true,
        init: function () {
            let self = this;
            // config
            //self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Delete";
            //self.on("addedfile", function (file) {console.log('new file added inside INIT LOGIC!!!', file);});
            self.on("complete", function (file) {
                //console.log('complete LOGIC!!!', file);
                self.removeFile(file);
            });

        }
    };

    constructor() {
    }

    ngOnDestroy(): void {
        this.config = null;
    }

    onUploadError(args: any) {
        console.log('onUploadError:', args);
    }

    onUploadSuccess(args: any) {
        /*
        args[0].previewElement.querySelector('.dz-remove').innerHTML = '<i class="">Delete</i>';
        args[0].previewTemplate.querySelector('.dz-remove').innerHTML = '<i class="">Delete</i>';
        */
        this.insertPicture(args);
    }

    onRemovedfile(file) {
        console.log("onRemovedfile");
        console.log(file);
    }

    insertPicture(args) {
        let file = JSON.parse(args[1]).files[0];

        let picture: IPicture = {
            isActive: true,
            name: file.name,
            url: '/upload/' + file.name,
            userId: Meteor.userId(),
            type: file.type,
            uploadedAt: new Date(),
            size: file.size
        };

        MeteorObservable.call('addPicture', picture).subscribe({
            next: (_id: string) => {
                args[0].name = file.name;
                args[0]._id = _id;
                args[0].previewElement.querySelector('.dz-filename > span').innerHTML = file.name;
                args[0].previewTemplate.querySelector('.dz-filename > span').innerHTML = file.name;
                /*
                args[0].previewElement.querySelector('.dz-remove').innerHTML = '<i class="">Delete</i>';
                args[0].previewTemplate.querySelector('.dz-remove').innerHTML = '<i class="">Delete</i>';
                 */
                // console.log("inserted : ", _id);
                this.onFile.emit(_id);

            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }
}