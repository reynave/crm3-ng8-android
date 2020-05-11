export class Company {
    error: number;
    result: [{
        data: [
            {
                id: string;
                name: string;
                website: string;
                phone: string;
                mobile: string;
                fax: string;
                industry: string;
                address: string;
                input_date: string;
                input_by: string;
                update_date: string;
                update_by: any;
                check: boolean;
            }
        ]
        total: number;
        total_view: number;
        pages: number;
    }]
}

export class Selected {
    error: number;
    result: {
        industry: [
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

export class CompanyDetail {
    error: number;
    result: {
        branch: [
            {
                address: string;
                code: string;
                email: string;
                fax: string;
                id: string;
                name: string;
                phone: string;
            }
        ];
        data:
        {
            address: number;
            email: number;
            fax: number;
            id: number;
            industry: number;
            input_by: any;
            input_date: number;
            name: number;
            phone: number;
            update_by: any;
            update_date: number;
            website: number;
        }
        contact: [
            {
                email: string;
                id: string;
                mobile: string;
                name: string;
                phone: string;
                user: string;
            }
        ]
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

export class NewCompany {

    constructor(
        public name: string,
        public website: string,
        public phone: string,
        public mobile: string,
        public email: string,
        public fax: string,

        public id_industry: string,
        public id_company_class: string,
        public id_user: string,

        public bill_street: string,
        public bill_city: string,
        public bill_state: string,
        public bill_code: string,
        public bill_country: string,
       
        public ship_street: string,
        public ship_city: string,
        public ship_state: string,
        public ship_code: string,
        public ship_country: string,
      
    ) { }

}

export class CompanyEdit {
    error: number;
    result: {
        data:
        {
            address_city: string;
            address_code: string;
            address_state: string;
            address_street: string;
            email: string;
            fax: string;
            id: string;
            id_industry: string;
            input_by: string;
            input_date: string;
            name: string;
            phone: string;
            update_by: any;
            update_date: string;

            website: string;
        }
    }
}

export class UpdateCompany {

    constructor(
        
        public bill_country: string,  
        public bill_city: string,
        public bill_code: string,
        public bill_state: string,
        public bill_street1: string,  

        public ship_country: string,  
        public ship_city: string,
        public ship_code: string,
        public ship_state: string,
        public ship_street1: string,

        public email: string,
        public fax: string, 
        public id_industry: string,
        public name: string,
        public phone: string,
        public website: string,
        public id_user: string,
        public id_company_class: string,
      public code_number: string,
      
    ) { }

}