export const menus = [
    {
        "name": "Home",
        "icon": "dashboard",
        "link": "/dashboard",
        "open": false,
    },
    {
        "name": "Admin",
        "icon": "settings",
        "open": false,
        "link": false,
        "admin": true,
        "sub": [
            {
                "name": "Places",
                "icon": "explore",
                "link": "/admin/places",
                "open": false,
                "admin": true,
            },
            //HIDE this for now
            /*{
                "name": "Addresses",
                "icon": "explore",
                "link": "/admin/addresses",
                "open": false,
                "admin": true,
            },*/
            {
                "name": "Listing",
                "icon": "list",
                "link": "/admin/list-groups",
                "open": false,
                "admin": true,
            },
            {
                "name": "Length units",
                "icon": "compare arrows",
                "link": "/admin/length-units",
                "open": false,
                "admin": true,
            },
            {
                "name": "Property types",
                "icon": "compare arrows",
                "link": "/admin/property-types",
                "open": false,
                "admin": true,
            },
            {
                "name": "Bedroom types",
                "icon": "compare arrows",
                "link": "/admin/bedroom-types",
                "open": false,
                "admin": true,
            },
            {
                "name": "Bathroom types",
                "icon": "compare arrows",
                "link": "/admin/bathroom-types",
                "open": false,
                "admin": true,
            },

            {
                "name": "Subscribers",
                "icon": "subscriptions",
                "link": "/admin/subscribers",
                "open": false,
                "admin": true,
            },
        ]
    },
    {
        "name": "Properties",
        "icon": "home",
        "link": "/properties",
        "open": false,
    }
    /*

    {
        "name": "maps",
        "icon": "map",
        "open": false,
        "link": false,
        "sub": [
            {
                "name": "google-map",
                "icon": "directions",
                "link": "maps/googlemap",
                "open": false,
            },
            {
                "name": "leaflet-map",
                "icon": "directions",
                "link": "maps/leafletmap",
                "open": false,
            }
        ]
    }*/
];
