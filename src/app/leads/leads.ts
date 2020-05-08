export class Lead {
    error: number;
    result: [{
        data: [
            {
                id: string;
                user: string;
                name: string;
                company: string;
                email: string;
                lead_source: string;
                lead_status: string;
                lead_status_color: string;
                lead_status_value: string;
                website: string;
                phone: string;
                mobile: string;
                fax: string;
                industry: string;
                opportunity: string;
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

export class LeadDetail {
    error: number;
    result: {
        data:
        {
            address: string;
            amount: number;
            company: string;
            currency: string;
            fax: string;
            id: string;
            id_lead_status: string;
            id_user: string;
            industry: string;
            input_by: string;
            input_date: string;
            lead_source: string;
            lead_status_color: string;
            lead_status_name: string;
            mobile: string;
            name: string;
            opportunity: string;
            phone: string;
            update_by: string;
            update_date: string;
            user: string;
            website: string;
        }
    }
    lead_status: [
        {
            color: string;
            id: string;
            name: string;
            value: number;
        }
    ]
}


export class Company {
    error: number;
    result: [{
        data: [
            {
                address: string;
                id: string;
                name: string;
                website: string;

            }
        ]
    }]
}


export class Selected {
    error: number;
    id_user: [
        {
            id: number;
            name: string;
        }
    ]
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
    status: [
        {
            color: string;
            id: number;
            name: string;
            value: string;
        }
    ]
    title: [
        {
            id: number;
            name: string;
        }
    ]
}

export class Newlead {

    constructor(
        public id_user: string,
        public id_title: string,
        public id_lead_source: string,
        public id_industry: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public mobile: string,
        public phone: string,
        public company: string,
        public website: string,
        public address_street: string,
        public address_city: string,
        public address_state: string,
        public address_code: string,
        public address_country: string,

        public id_company: string,
        public id_lead_status: string,
        public id_company_class: string,
        
        public position: string,
        public department: string,
        public fax: string, 
        public sex: string,
        public birthdate: any, 
        public isDuplicate : boolean,
    ) { }

}

export class LeadEdit {
    error: number;
    result: {
        data:
        {
            address_city: string;
            address_code: string;
            address_state: string;
            address_street: string;
            company: string;
            dbAddress: string;
            dbIndustry: string;
            dbWebsite: string;
            email: string;

            fax: string;
            first_name: string;
            id: string;
            id_company: string;

            id_industry: string;
            id_lead_source: string;
            id_lead_status: string;

            id_title: string;
            id_user: string;
            input_by: string;
            input_date: string;
            last_name: string;
            mobile: string;
            opportunity: string;
            phone: string;
            update_by: any;
            update_date: string;
            website: string;
        }
    }
}

export class LeadConvert{
    constructor(
        public isDuplicate: string,
        public newCompany: boolean,
        public cl_id_company: string,
        public cl_id_company_class: string,

        public lc_first_name: string,   
        public lc_last_name: string,   

        public opportunity: string,
        public amount: string,
     
        public id_user: string,
        public expecting_closing_date: any,

        
    ) { }
}

export class UpdateLead {

    constructor(
        public id_user: string,
        public id_title: string,
        public id_lead_source: string,
        public id_industry: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public mobile: string,
        public phone: string,
        public company: string,
        public website: string,
        public address_street: string,
        public address_city: string,
        public address_state: string,
        public address_code: string,
        public address_country: string,
        
        public opportunity: string,  
        public position: string,
        public amount: number,
        public id_company_class: string,
        public department: string,
        public fax: string,

        public sex: string,
        public birthdate: any,
    ) { }

}

export class Opportunity {
    constructor(
        public opportunityName: string,
        public id_user: string,
    ) { }
}
export class SelectUser {
    error: number;
    data: {
        user: [
            {
                id: string;
                name: string;
            }
        ]
    }

}

export class leadConvert {

    error: number;
    result: {
        data:
        {
            company: string;
            contact: string;
            id: string;
            id_company: string;
            id_contact: string;
            id_lead: string;
            id_opportunity: string;
            id_user: string;
            input_by: string;
            input_date: string;
            lead: string;
            lead_input_date: string;
            opportunity: any;
            update_by: any;
            update_date: string;
            user: string;
        }

    }

}