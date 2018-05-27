export class Receiver {
    public receiver_Name: string;
    public receiver_Address: string;
    public receiver_VAT_Id: string;
    public receiver_Email: string;
    public receiver_PhoneNumber: string;

    constructor() { }

    public isValidData(): boolean {
        return Boolean(
            this.receiver_Address && this.receiver_Email && this.receiver_VAT_Id && this.receiver_Name && this.receiver_PhoneNumber
        );
    }

    public setData(receiverData: any): void {
        this.receiver_Name = receiverData.receiver_Name;
        this.receiver_Address = receiverData.receiver_Address;
        this.receiver_VAT_Id = receiverData.receiver_VAT_Id;
        this.receiver_Email = receiverData.receiver_Email;
        this.receiver_PhoneNumber = receiverData.receiver_PhoneNumber;
    }
}
