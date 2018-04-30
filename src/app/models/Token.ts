export class Token {
    token: string;
    expirationDate: number;
    role: number;

    constructor(token: string, expirationTime: number, role: number) {
        this.token = token;
        this.expirationDate = (new Date((new Date).getTime() + expirationTime * 1000)).getTime();
        this.role = role;
    }
}