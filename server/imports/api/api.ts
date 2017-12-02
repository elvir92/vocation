// import {uploadBuffer} from "../../../imports/images";
/*


if (Meteor.isServer) {
    // Global API configuration
    var Api = new Restivus({
        //useAuth: true,
        //useDefaultAuth: true,
        prettyJson: true
    });

    // Generates: GET, POST on /api/items and GET, PUT, PATCH, DELETE on
    // /api/items/:id for the Items collection
    //Api.addCollection(Meteor.users);

    Api.addRoute('upload-files', {
        post: function () {
            console.log("upload-files called");
            // Busboy processes the form-data file attachment
            // SRC - https://www.codetutorial.io/meteor-server-file-upload/
            const busboy = new Busboy({headers: this.request.headers});
            const server = this;
            let files = []; // Store files in an array and then pass them to request.
            let audio = {}; // create an audio object
            this.response.write(""); // this prevents Meteor from ending the response before we've async processed the uploaded file in busboy

            busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                audio.mimeType = mimetype;
                audio.encoding = encoding;
                audio.filename = filename;

                // buffer the read chunks
                var buffers = [];

                file.on('data', function (data) {
                    buffers.push(data);
                });
                file.on('end', function () {
                    // concat the chunks
                    audio.data = Buffer.concat(buffers);
                    // push the image object to the file array
                    files.push(audio);
                });
            });

            // busboy.on("field", function(fieldname, value) {
            //   server.request.body[fieldname] = value;
            // });

            busboy.on("finish", Meteor.bindEnvironment(function () {
                // let res = uploadBuffer(files[0].data);

                // The file has been processed, so save it to the file system
                let newFile = new FS.File();

                newFile.attachData(files[0].data, {type: files[0].mimeType}, function (err) {
                    // we actually want the filename to have "undefined" at the end // newFile.name(files[0].filename);
                    console.log(newFile);
                    console.log(err);

                    server.response.write("success");
                    server.done();
                });
            });
            // Pass request to busboy
            this.request.pipe(busboy);
            return {
                status: "success",
                data: {
                    "update": "everything is fine"
                }
            };
        }
    }, null);
}
*/