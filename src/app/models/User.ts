import {UserType} from './enums/user.types';

export class User {
    Id: number;
    Login: string;
    Password: string;
    Password2: string;
    Role: number = UserType.Client;
    Name: string;
    Address: string;
    VAT_Id: string;
    Email: string;

    public isValidData(): boolean {
        return this.isValidLogin() && this.isValidPassword() && this.isValidRole();
    }

    public isValidDataWhileEditing(): boolean {
        return this.isValidLogin() && this.isValidPasswordWhileEditing() && this.isValidRole();
    }

    public getUserData(): object {
        return {
            Login: this.Login,
            Password: this.Password,
            Role: this.Role
        };
    }

    public getClientData(): object {
        return {
            Login: this.Login,
            Password: this.Password,
            Role: this.Role,
            Name: this.Name,
            Address: this.Address,
            VAT_Id: this.VAT_Id,
            Email: this.Email
        };
    }

    public onRoleChanged(): void {
        if (this.isClient()) {
            delete this.Name;
            delete this.Address;
            delete this.VAT_Id;
            delete this.Email;
        }
    }

    public setDataFromUser(userData): void {
        this.Id = userData.id;
        this.Login = userData.login;
        this.Role = userData.role;
        this.Name = userData.name;
        this.Address = userData.address;
        this.VAT_Id = userData.vaT_Id;
        this.Email = userData.email;
    }

    public isClient(): boolean {
        return Number(this.Role) === UserType.Client;
    }

    private isValidLogin() {
        return this.Login && this.Login.length > 3;
    }

    private isValidPassword() {
        return this.Password && this.Password.length >= 8 && this.Password === this.Password2;
    }

    private isValidPasswordWhileEditing() {
        return this.isValidPassword() || (!this.Password && !this.Password2);
    }

    private isValidRole() {
        return this.Role && Object.keys(UserType).some(key => UserType[key] === Number(this.Role));

    }
}
