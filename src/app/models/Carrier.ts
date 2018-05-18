export class Carrier {
    public carrier_Name: string;
    public carrier_Address: string;
    public carrier_VAT_Id: string;
    public carrier_Email: string;

    constructor() { }

    public isValidData(): boolean {
        return Boolean(
            this.carrier_Address && this.carrier_Email && this.carrier_VAT_Id && this.carrier_Name
        );
    }
}
