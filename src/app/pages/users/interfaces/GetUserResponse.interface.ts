export interface GetUserResponse {
    data: Users[];
    page: number;
    pageSize: number;
}

export interface Users {
    id: number;
    fullName: string;
    email: string;
    role: string;
    active: boolean;
    createDate: Date;
}