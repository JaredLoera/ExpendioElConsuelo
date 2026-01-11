export interface user {
    id?:        number;
    fullName:  string;
    email:     string;
    active?:    boolean;
    password?:  string;
    createdAt?: Date;
    updatedAt?: Date;
}