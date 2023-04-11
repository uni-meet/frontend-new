export interface IPicture {
    result: string,
    message: string,
    data: {
        userId: string,
        description: string,
        pictureImage: string,
        createdAt: Date,
        updatedAt: Date,
    }
}

export interface ISharePictureInfo {
    userId: string,
    description: string,
    pictureImage: Blob,
}