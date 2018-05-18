export class Receiver {
    public receiver_Name: string;
    public receiver_Address: string;
    public receiver_VAT_Id: string;
    public receiver_Email: string;

    constructor() { }

    public isValidData(): boolean {
        return Boolean(
            this.receiver_Address && this.receiver_Email && this.receiver_VAT_Id && this.receiver_Name
        );
    }
}
