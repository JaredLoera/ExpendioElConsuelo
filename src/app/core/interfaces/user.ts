export interface user {
    id?:        number;
    full_name:  string;
    email:     string;
    password?:  string;
    createdAt?: Date;
    updatedAt?: Date;
}