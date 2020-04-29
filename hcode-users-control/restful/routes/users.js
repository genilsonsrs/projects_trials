let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) =>{

    //Listar todos usuários
    let route = app.route('/users');

    route.get((req,res)=>{

        db.find({}).sort({name:1}).exec((err, users)=>{
            if(err){
                app.utils.error.send(err, res, res);
            }else{
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json({
                    users
                });
            }
        });       
        
    });
    
    //Inserir um usuario
    route.post((req,res)=>{

        if(!app.utils.validator.user(app, req, res)) return false;

        db.insert(req.body, (err, user)=>{

            if(err){

                app.utils.error.send(err, res, res);

            }else{

                res.status(200).json(user);

            }

        });
        
    });

    //Buscar um usuário
    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        db.findOne({_id:req.params.id}).exec((err, user) =>{

            if(err){

                app.utils.error.send(err, res, res);

            }else{

                res.status(200).json(user);

            }

        })

    })

    //Alterar um usuário
    routeId.put((req, res) => {

        if(!app.utils.validator.user(app, req, res)) return false;

        db.update({_id:req.params.id}, req.body, err =>{

            if(err){

                app.utils.error.send(err, res, res);

            }else{

                res.status(200).json(Object.assign(req.params, req.body));

            }

        })
        
    })

    //Deletar um usuário
    routeId.delete((req, res) => {

        db.remove({_id:req.params.id}, req.body, err =>{

            if(err){

                app.utils.error.send(err, res, res);

            }else{

                res.status(200).json(req.params);

            }

        })
        
    })

};