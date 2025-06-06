export const appName = "My Awesome App";
export const version = "1.0.0";

export interface User {
    id: number;
    name: string;
}

export const currentUser: User = {
    id: 1,
    name: "John Doe"
};