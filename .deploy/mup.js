module.exports = {
    servers: {
        one: {
            // TODO: set host address, username, and authentication method
            host: '',
            username: 'root',
            //pem: '~/.ssh/id_rsa'
            password: ''
            // or neither for authenticate from ssh-agent
        }
    },

    app: {
        // TODO: change app name and path
        //Uncomment this line for developmenet deployment
        //name: 'vocation',
        name: '',
        path: '../',

        servers: {
            one: {},
        },

        buildOptions: {
            serverOnly: true,
        },

        env: {
            // TODO: Change to your app's url
            // If you are using ssl, it needs to start with https://
            //Uncomment this line for developmenet deployment
            //PORT: 3000,
            ROOT_URL: '',
            MONGO_URL: '',
            MONGO_OPLOG_URL: '',
        },

        docker: {
            // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
            image: 'abernix/meteord:node-8.4.0-base',
        },

        // Show progress bar while uploading bundle to server
        // You might need to disable it on CI servers
        enableUploadProgressBar: true
    },

    mongo: {
        version: '3.4.1',
        servers: {
            one: {}
        }
    },

    // (Optional)
    // Use the proxy to setup ssl or to route requests to the correct
    // app when there are several apps

    // proxy: {
    //   domains: 'mywebsite.com,www.mywebsite.com',

    //   ssl: {
    //     // Enable Let's Encrypt
    //     letsEncryptEmail: 'email@domain.com'
    //   }
    // }
    plugins: ['mup-fix-bin-paths']

};
