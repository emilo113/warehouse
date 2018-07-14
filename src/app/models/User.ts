import { UserType } from './enums/user.types';

export class User {
    Id: number;
    Login: string;
    Password: string;
    Password2: string;
    Role: number = UserType.Client;
    UserName: string;
    UserSurname: string;
    PhoneNumber: string;
    Name: string;
    Address: string;
    PrefixVAT_Id: string;
    VAT_Id: string;
    Email: string;

    public isValidData(): boolean {
        return this.UserName && this.UserSurname && this.isValidLogin() && this.isValidPassword() && this.isValidRole();
    }

    public isValidDataWhileEditing(): boolean {
        return this.UserName && this.UserSurname && this.isValidLogin() && this.isValidPasswordWhileEditing() && this.isValidRole();
    }

    public getUserData(): object {
        const data: any = {
            Login: this.Login,
            Password: this.Password,
            Role: this.Role,
            UserName: this.UserName,
            UserSurname: this.UserSurname
        };

        if (this.Id) {
            data.Id = this.Id;
        }

        return data;
    }

    public getClientData(): object {
        const data: any = {
            Login: this.Login,
            Password: this.Password,
            Role: this.Role,
            UserName: this.UserName,
            UserSurname: this.UserSurname,
            Name: this.Name,
            Address: this.Address,
            VAT_Id: this.VAT_Id,
            PrefixVat_Id: this.PrefixVAT_Id,
            Email: this.Email,
            PhoneNumber: this.PhoneNumber
        };

        if (this.Id) {
            data.Id = this.Id;
        }

        return data;
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
        this.PrefixVAT_Id = userData.prefixVat_Id;
        this.Email = userData.email;
        this.UserName = userData.userName;
        this.UserSurname = userData.userSurname;
        this.PhoneNumber = userData.phoneNumber;
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
