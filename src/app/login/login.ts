export class Login {
    constructor(
        public email: string,
        public password: string, 
        public remember:boolean,
        public player_id: string,
        public device : string
      
      ) {  }
}

export class Repass {
  constructor(
      public email: string, 
    ) {  }
}

