export interface IPicture {
    _id?: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
    url: string;
    userId?: string;
    isActive: boolean;
}