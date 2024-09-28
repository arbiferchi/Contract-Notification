
export interface Doc {
    _id?: string; // Optional, as MongoDB generates this automatically
    contractId: string; // The ID of the contract associated with this document
    fileName: string; // The name of the uploaded file
    contentType: string; // The MIME type of the file (e.g., 'application/pdf')
    size: number; // The size of the file in bytes
    filePath: string; // The file data, represented as an ArrayBuffer in Angular
    createdAt?: Date; // Optional, set by default in MongoDB
}  