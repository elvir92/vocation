interface IMongoPagination {
    limit: number;
    skip: number;
}

export interface IMongoOptions extends IMongoPagination {
    [key: string]: any;
}