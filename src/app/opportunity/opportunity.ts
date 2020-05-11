export class Opportunity {
    error: number;
    result: [{
        data: [
            {
                amount: number;
                check: boolean;
                company: string;
                contact: string;
                id: string;
                id_company: string;
                id_contact: string;
                currency: string;
                stage: string;
                id_user: string;
                name: string;
                progress: string;
                user: string;
                input_date: string;
                input_by: number;
                update_date: string;
                update_by: number;

            }
        ]
        total: number;
        total_view: number;
        pages: number;
    }]
}


export class OpportunityDetail {
    error: number;
    result: {
        data:
        {
            amount: number;
            check: boolean;
            company: string;
            contact: string;
            final_stage: boolean;
            id: string;
            id_company: string;
            id_contact: string;
            currency: string;
            stage: string;
            id_user: string;
            industry: string;
            lead_source: string;

            name: string;
            progress: string;
            user: string;
            input_date: string;
            input_by: number;
            update_date: string;
            update_by: number;
        }
        stage: [
            {
                id: string;
                name: string;
                progress: string;
                done: any;
                current: any;
                isSelected: boolean;
                notes:string;
            }
        ]
        width: string;
        user: [
            {
                id: string;
                name: string;
            }
        ]
    }

}

export class OpportunityContact{
    error: number;
    result: {
        contact: [
            {
                id: number;
                name: string;
            }
        ]
    }
}

export class OpportunityEdit {
    error: number;
    result: {
        data: {
            amount: number;
            company: string;
            contact: string;
            currency: string;
            id: string;
            id_company: string;
            id_contact: string;
            id_lead_source: string;
            id_user: string;
            input_by: any;
            input_date: string;
            name: string;
            progress: string;
            stage: string;
            update_by: any;
            update_date: string;
            user: string;

        }
        lead_source: [
            {
                id: string;
                name: string;
            }
        ]
        contact: [
            {
                id: string;
                name: string;
            }
        ]
        user: [
            {
                id: string;
                name: string;
            }
        ]
    }
}

export class OpportunityNew {
    error: number;
    result: {
        company: [
            {
                id: string;
                name: string;
            }
        ]
        data : {
            id_user:string;
        }
        lead_source: [
            {
                id: string;
                name: string;
            }
        ]
       
        user: [
            {
                id: string;
                name: string;
            }
        ]
        title: [
            {
                id: string;
                name: string;
            }
        ]
    }
}

export class OpportunityUpdate {
    constructor(
        public name: string,
        public id_lead_source: string,
        public id_user: string,
        public id_contact: string,
    ) { }
}

export class OpportunityInsert{
    constructor(
        public opportunity : string,
        public id_lead_source: number,
        public id_user: string,
        public id_company: number,
        public id_contact: number,
        
        public id_title: number,
        public first_name: string,
        public last_name: string,
        public insertContact:boolean,
    ) { }
}

export class OpportunityClosedLose {
    constructor(
        public notes: string,
        public date: Date,
        public id_user: string,
    ) { }
}

export class OpportunityClosedWin {
    constructor( 
        public notes: string,
        public date: any,
        public id_user: string,
        public id_quote: string,
        public sales_order:string,
        public amount:number,
    ) { }
}


export class NewOpportunity{
    constructor(
        public id_user: string,
        public name: string,
        public amount: string,
        public id_contact: string,
        public id_company: string, 
        public expecting_closing_date : any, 
        public id_stage: string, 
        public id_lead_source: string,  
    ){}
}



export class UpdateOpportunity{
    constructor(
        public id_user: string,
        public id_opportunity_business: string, 
        public id_lead_source: string,
        public name: string,
        public amount: string, 
        public start_date : any,  
        public closed_date : any,  
        public id_contact : string,  
        public expecting_closing_date : any,  
        public budget : string,  
       
        //CUSTOME
        public comparison_with_competitor : string,
        public competitor : string,
        public critical_point : string,
        public our_proposal : string, 
        public po : string,
        public notes1 : string,
        public notes2 : string,
        public notes3 : string,
        public id_quote : string,  
       

    ){}
}