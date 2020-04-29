class UserController{

    constructor(formEl, formAl, tableEL){

        this.formId = document.getElementById(formEl);
        this.formAd = document.getElementById(formAl);
        this.tableId = document.getElementById(tableEL);
        this.valorTr;

        this.onSubmit();
        this.onEditCancel();
        this.selectAll();
        
    }

    onEditCancel(){//Submete a edição de usuário
        document.querySelector("#cancel-edit-users").addEventListener("click", e =>{
            this.showPanelCreate();
        })

        this.formAd.addEventListener("submit", e=>{

            e.preventDefault();

            let buttonSubmit = this.formAd.querySelector("[type=submit");
            let values = this.getValues(this.formAd);

            buttonSubmit.disabled = true;

            let index = this.formAd.dataset.trIndex;

            let tr = this.tableId.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({},userOld, values);

            this.getPhoto(this.formAd).then(
                (content)=>{ 

                    if(!values.photo){
                        result._photo = userOld._photo;
                    } else{
                        result._photo = content;
                    }

                    tr.dataset.user = JSON.stringify(result);

                    let user = new User();

                    user.loadFromJSON(result);

                    user.save();

                    tr.innerHTML = `<tr>
                                        <td><img src=${result._photo} alt="User Image" class="img-circle img-sm"></td>
                                        <td>${result._name}</td>
                                        <td>${result._email}</td>
                                        <td>${(result._admin) ? 'Sim' : 'Não'}</td>
                                        <td>${dateFormater(result._register)}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                                            <button type="button" class="btn btn-danger btn-drop btn-cancel btn-xs btn-flat">Excluir</button
                                        </td>
                                    </tr>`;

                    this.addEventsTr(tr);

                    this.updateCount();

                    this.formAd.reset();

                    buttonSubmit.disabled = false;

                    alert("Usuário alterado com Sucesso!"); 

                    this.showPanelCreate();

                },
                (e) => {

                    console.error(e);

                }
            );  

        })
    }
    //End onEditCancel()

    onSubmit(){//Submete o formulario com suas devidas validações

        this.formId.addEventListener("submit", e => {        

            e.preventDefault();

            let buttonSubmit = this.formId.querySelector("[type=submit");
            let values = this.getValues(this.formId);

            buttonSubmit.disabled = true;

            if(!values){
                buttonSubmit.disabled = false;
                return false;
            } 

            this.getPhoto(this.formId).then(
                (content)=>{

                    values.photo = content;

                    values.save();

                    this.addLine(values);

                    this.formId.reset();

                    buttonSubmit.disabled = false;

                    alert("Usuário cadastrado com Sucesso!");

                },
                (e) => {

                    console.error(e);

                }
            );            

        });

    }    
    //End onSubmit()

    getValues(formId){//Carrega as informações contidas no form para serem salvas no onsubmit

        let user = {};
        let isValid = true;

        //O spread faz com que os elementos do objeto sejam representados como um array, pois o foreach só executa em array.
        [...formId.elements].forEach(function(field, index) {

            //Pinta os campos não preenchidos de vermelho
            if(['name','email','password'].indexOf(field.name) > -1 && !field.value){

                field.parentElement.querySelector(".help-block").classList.remove('invisivel');
                field.parentElement.classList.add('has-error');
                isValid = false;

            }

            //Remove css dos campos pintados de vermelho
            if(['name','email','password'].indexOf(field.name) > -1 && field.value){

                field.parentElement.querySelector(".help-block").classList.add('invisivel');
                field.parentElement.classList.remove('has-error');

            }

            if(field.name == 'gender'){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }else if(field.name == 'admin'){
                user[field.name] = field.checked;
            }else{
                user[field.name] = field.value;
            }      
    
        });

        if(!isValid){
            return false;
        }
    
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );       

    }
    //End getValues()

    getPhoto(formId){//Resgata a foto

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements= [...formId.elements].filter(item =>{

                if(item.name === 'photo'){
                    return item;
                }

            })

            let file = elements[0].files[0];

            fileReader.onload = ()=>{
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            }

            if(file){
                fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }

        });    

    }
    //End getPhoto()

    addLine(dataUser){//Ao finalizar cadastro insere uma nova linha da tabela da view

        var tr = document.createElement('tr');
        var tabela = document.querySelector("#table-users");        

        this.valorTr = JSON.stringify(dataUser);
        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `<tr>
                            <td><img src=${dataUser.photo} alt="User Image" class="img-circle img-sm"></td>
                            <td>${dataUser.name}</td>
                            <td>${dataUser.email}</td>
                            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                            <td>${dateFormater(dataUser.register)}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                                <button type="button" class="btn btn-danger btn-drop btn-xs btn-flat">Excluir</button
                            </td>
                        </tr>`;
        
        this.addEventsTr(tr);

        this.tableId.appendChild(tr);        

        this.updateCount();
    }
    //End addLine()

    selectAll(){ //Seleciona os dados do objeto do local storage

        let users = User.getUserStorage();

        users.forEach(dataUser=>{

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user)
        })

    }
    //End selectAll()

    addEventsTr(tr){ //Add eventos dos botões de editar e excluir da tabela de usuarios

        tr.querySelector(".btn-drop").addEventListener("click", e=>{

            if(confirm("Deseja realmente excluir?")){

                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.remove();

                tr.remove();

                this.updateCount();

            }

        });

        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);

            this.formAd.dataset.trIndex = tr.sectionRowIndex;

            for(let name in json){
                let field = this.formAd.querySelector("[name=" + name.replace("_","") + "]");               
                
                if(field){

                    switch(field.type){
                        case 'file':
                            continue;
                        break;
                        case 'radio':
                            field = this.formAd.querySelector("[name=" + name.replace("_","") + "][value=" + json[name] + "]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            field.checked = json[name];
                        break;
                        default:
                            field.value = json[name];
                    }                    
                }
            }

            this.formAd.querySelector(".photo").src = json._photo;

            this.showPanelEdit();
        });
    }

    showPanelEdit(){ //Mostra a div de ediçãod e usuario e esconde a div de criação
        document.querySelector("#box-user-update").classList.remove("invisivel");
        document.querySelector("#box-user-create").classList.add("invisivel");
    }
    //End showPanelEdit()

    showPanelCreate(){ //Mostra a div de criação de usuário e esconde a div de edição
        document.querySelector("#box-user-create").classList.remove("invisivel");
        document.querySelector("#box-user-update").classList.add("invisivel");        
    }
    //End showPanelCreate()

    updateCount(){//Atualiza os contadores de usuarios
        let numberUsers = 0;
        let numberUsersAdmin = 0;

        [...this.tableId.children].forEach(tr=>{
            numberUsers++;

            let user = JSON.parse(tr.dataset.user);
    
            if(user._admin) numberUsersAdmin++;
        })

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberUsersAdmin;

    }
    //End updateCount()
    
}