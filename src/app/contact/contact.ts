export class Contact {
    error: number;
    result: [{
        data: [
            {
                check: boolean;
                company: string;
                email: string;
                id: string;
                mobile: string;
                name: string;
                phone: string;
                user: string;
            }
        ]
        total: number;
        total_view: number;
        pages: number;
    }]
}

export class Selectedcompany {
    error: number;
    result: {
        company: [
            {
                id: number;
                name: string;
            }
        ]
        lead_source: [
            {
                id: number;
                name: string;
            }
        ]
        title: [
            {
                id: number;
                name: string;
            }
        ]
        user: [
            {
                id: number;
                name: string;
            }
        ]
    }

}

export class ContactDetail {
    error: number;
    result: {
        data:
        {
            address: number;
            email: number;
            fax: number;
            id: number;
            id_company:string;
            industry: number;
            input_by: any;
            input_date: number;
            name: number;
            phone: number;
            update_by: any;
            update_date: number;
            website: number;
        }
        opportunity: [
            {
                amount: number;
                company: string;
                contact: string;
                currency: string;
                id: string;
                input_by: string;
                input_date: string;
                name: string;
                progress: string;
                stage:string;
                update_by: string;
                update_date:string;
                user: string;
            }
        ];
    }
}

export class NewContact {

    constructor(
        public id_title: string,
        public first_name: string,
        public last_name: string,
        public mobile: string,
        public phone: string,

        public id_lead_source: string,
        public id_user: string,
        public id_company: string,

        public position: string,
        public department: string, 
    ) { }

}

export class updateContact {

    constructor(
        public id_title: string,
        public first_name: string,
        public last_name: string,
        public mobile: string,
        public phone: string,

        public id_lead_source: string,
        public id_user: string,
        public id_company: number,
    ) { }

}


export class ContactEdit {
    error: number;
    result: {
        company: [
            {
                id: number;
                name: string;
            }
        ]
        data:
        {
            email: string;
            first_name: string;
            id: string;
            id_company:string;
            id_lead_source: string;
            id_title: string;
            id_user: string;
            input_by: any;
            input_date: string;
            last_name: string;
            mobile: string;
            name:string;
            phone: string;
            update_by: any;
            update_date: string;
        }
        lead_source: [
            {
                id: number;
                name: string;
            }
        ]
        title: [
            {
                id: number;
                name: string;
            }
        ]
        user: [
            {
                id: number;
                name: string;
            }
        ]
        
    }
}



export class UpdateContact {

    constructor(
        
        public id_company :string,
        public email: string,
        public first_name: string,
        public id_lead_source: string,
        public id_title: string,
        public id_user: string,
        public last_name: string,
        public mobile: string,
        public phone: string,
        public position: string,
        public department: string,
        
    ) { }

}
