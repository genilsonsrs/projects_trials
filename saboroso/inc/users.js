var conn = require('./db');

module.exports = {

    //Renderiza os dados de autenticação e direciona o usuario para a tela inicial do Admin
    render(req, res, error, success){

        res.render('admin/login', {
            body: req.body,
            error
        })

    },

    //Metodo de validação do login do usuario na tela de autenticação
    login(email, password){

        return new Promise((resolve, reject)=>{

            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, 
            [email],

            (err, results)=>{

                if(err){

                    reject(err);

                }else{

                    if(!results.length > 0){

                        reject("Usuário ou senha incorretos");

                    }else{

                        let row = results[0];

                        if(row.password !== password){

                            reject("Usuário ou senha incorretos");

                        }else{
                            console.log("Vai logar!");
                            resolve(row);

                        }

                    }
                    
                }
            })

        });

    }

}