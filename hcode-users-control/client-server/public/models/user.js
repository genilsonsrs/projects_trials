class User{

    constructor(name, gender, birth, country, email, password, photo, admin){
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    //Getters
    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    get register(){
        return this._register;
    }

    //Setters
    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json) {
        for (let name in json) {
            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    if (name.substring(0, 1) === '_') this[name] = json[name];
                //this[name] = json[name];
            }

        }
    }

    getNewId(){

        let usersID = parseInt(localStorage.getItem("usersID"));

        if(!usersID > 0) usersID = 0;

        usersID++

        localStorage.setItem("usersID", usersID);

        return usersID;

    }

    static getUserStorage(){//Carrega usuários cadastrados no localstorage
        let users = [];

        if(localStorage.getItem("users")){
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;
    }

    toJSON(){

        let json = {};

        Object.keys(this).forEach(key =>{

            if(this[key] !== undefined) json[key] = this[key];

        });

        return json;

    }

    save(){

        return new Promise((resolve, reject) => {

            let promise;

            if(this.id){

                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());

            }else{

                promise = HttpRequest.post(`/users`, this.toJSON())

            };

            promise.then(data =>{

                this.loadFromJSON(data);

                resolve(this);

            }).catch(e=>{

                reject(e);

            })

        })        

    };

    remove(){

        return HttpRequest.delete(`/users/${this.id}`);

    }
}