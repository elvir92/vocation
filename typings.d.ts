/// <reference types="@types/node" />

declare var Fake: {
    sentence(words: number): string;
};

/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
    id: string;
}

declare var UploadServer;
/*
declare class Restivus {
    constructor(options?: any);

    public addCollection<T>(collection: Mongo.Collection<T>);

    public addRoute<T>(path: string, conf: {}, routes: {});
}
*/