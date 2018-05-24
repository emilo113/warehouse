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

    public setData(carrierData: any): void {
        this.carrier_Name = carrierData.carrier_Name;
        this.carrier_Address = carrierData.carrier_Address;
        this.carrier_VAT_Id = carrierData.carrier_VAT_Id;
        this.carrier_Email = carrierData.carrier_Email;
    }
}
