import { appName, version, User } from './data';

export function displayAppInfo(): string {
    return `${appName} v${version}`;
}

export function greetUser(user: User): string {
    return `Hello, ${user.name}!`;
}