export class CmrDispatch {
    public commodity_Type: string;
    public destination: string;
    public sender_Name: string;
    public sender_Address: string;
    public sender_VAT_Id: string;
    public sender_Email: string;

    constructor() { }

    public isValidData(): boolean {
        return Boolean(
            this.sender_Address &&
            this.sender_Email &&
            this.sender_VAT_Id &&
            this.sender_Name &&
            this.destination &&
            this.commodity_Type
        );
    }

    public setData(cmrDispatch: any): void {
        this.commodity_Type = cmrDispatch.commodity_Type;
        this.destination = cmrDispatch.destination;
        this.sender_Name = cmrDispatch.sender_Name;
        this.sender_Address = cmrDispatch.sender_Address;
        this.sender_VAT_Id = cmrDispatch.sender_VAT_Id;
        this.sender_Email = cmrDispatch.sender_Email;
    }
}
