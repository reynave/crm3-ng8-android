export class Activity {
    constructor(
        public id: number,
        public activity_type: {
            id: string,
            name: string,
            fas: string,
        },
        public subject: string,
        public due_date: string,
        public description: string,
        public start_date: string,
        public start_time: string,
        public end_date: string,
        public end_time: string,
        public log: string,
        public person: {
            id: string,
            name: string,
        },
        public show:boolean,
        public id_module: string,
        public input_date: string,
        public input_by: any,
        public update_date: string,
        public update_by: any,
    ){

    }
   
}


export class GetSelected {
    error: 0;
    result: {
        activity_priority: [
            {
                id: string;
                name: string;
            }
        ]
        id: string;
        data: {
            id_activity_priority: string;
            activity: [
                {
                    activity_type: {
                        id: string;
                        name: string;
                    },
                    id: string;
                    comment: string;
                    subject: string;
                    due_date: string;
                    priority: {
                        id: string;
                        color: string;
                        name: string;
                    },
                    name: string;
                    user: {
                        id: string;
                        name: string;
                    }
                    false: boolean;
                }
            ],
            history: [
                {
                    id: string;
                    subject: string;
                    comment: string;
                    due_date: string;
                    name: string;
                }
            ]
        }
        name: string;

        opportunity: [{
            id: string;
            name: string;
        }]
        request: string;
        user: [
            {
                id: string;
                name: string;
            }
        ]

    }
}



export class WidgetActivty {
    constructor(
        public id_activity_type: string,
        public id_user: string,
        public id_person: string,
        public id_module: string,
        public subject: string,
        public description: string,
        public due_date: any,
        public start_date: any,
        public end_date: any,
        public start_time: string,
        public end_time: string, 
         public id_company: string,
         public id_opportunity: string,
         public amount: number,
       
    ) {

    }
}


export class widgetList {
    error: 0;
    result: {
        activity: [
            {
                activity_type: {
                    id: string;
                    name: string;
                },
                id: string;
                comment: string;
                subject: string;
                due_date: string;
                priority: {
                    id: string;
                    color: string;
                    name: string;
                },
                name: string;
                user: {
                    id: string;
                    name: string;
                }
                false: boolean;
            }
        ],
        history: [
            {
                activity_type: {
                    id: string;
                    name: string;
                },
                id: string;
                comment: string;
                subject: string;
                due_date: string;
                close_date: string;
                priority: {
                    id: string;
                    color: string;
                    name: string;
                },
                name: string;
                user: {
                    id: string;
                    name: string;
                }
                false: boolean;
            }
        ]
    }


}