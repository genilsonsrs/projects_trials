var express = require('express');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var router = express.Router();

//Middleware roteador (Controla as sessions das paginas). Caso usuario tentar acessar aguma tela sem logar, o middlewre não deixa fazer sem autenticar.
router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect("/admin/login");
    }else{
        next();
    }

});

//Middleware roteador (Controla as sessions das paginas e popula os menus do Admin)
router.use(function(req, res, next){

    req.menus = admin.getMenus(req);

    next();

});

//Rota de logout da aplicação, encerrando a sessão de usuário criada na autenticação
router.get('/logout', function(req, res, next){

    delete req.session.user;

    res.redirect("/admin/login");

});

//Rota de acesso a tela principal, trazendo os dados do dashboard de contadores
router.get('/', (req, res, next) =>{

    admin.dashboard().then(data =>{

        if(!req.session.user){
            res.redirect("/admin/login");
        }else{
            res.render('admin/index', {
                menus: req.menus,
                user: req.session.user,
                data 
            });
        }

    }).catch(err =>{

        console.log(err);

    });    
    
});

//Rota para a tela de login. Sem nenhuma validação
router.get('/login', (req, res, next) =>{

    users.render(req, res, null, null);

});

//Rota de post do acesso na tela de login. Valida email e senha do usuario antes de encaminhar para a tela inicial
router.post('/login', (req, res, next) =>{

    if(!req.body.email){

        users.render(req, res, "Preencha o campo email.", null);

    }else if(!req.body.password){

        users.render(req, res, "Preencha o campo senha.", null);

    }else{

        users.login(req.body.email, req.body.password).then(user =>{

            req.session.user = user;

            res.redirect("/admin");

        }).catch(err=>{

            users.render(req, res, err.message || err, null);

        })
    }

})

//Rota da tela89568999
router.get('/contacts', (req, res, next) =>{

    admin.contacts().then(data =>{        

        res.render('admin/contacts', {
            menus: req.menus,
            user: req.session.user,
            data
        });

    }).catch(err =>{

        console.log(err);

    });

});

router.get('/emails', (req, res, next) =>{

    admin.emails().then(data =>{

        res.render('admin/emails', {
            menus: req.menus,
            user: req.session.user,
            data
        });
    
    }).catch(err =>{
    
        console.log(err);
    
    }); 

});

router.get('/menus', (req, res, next) =>{

    admin.menus().then(data =>{

        res.render('admin/menus', {
            menus: req.menus,
            user: req.session.user,
            data
        });

    }).catch(err =>{

        console.log(err);

    });  
    
});

router.post('/menus', (req, res, next) =>{

    res.send(req.body);  
    
});

router.get('/reservations', (req, res, next) =>{

    admin.reservations().then(data =>{

        res.render('admin/reservations', {
            date: {},
            menus: req.menus,
            user: req.session.user,
            data
        });

    }).catch(err =>{

        console.log(err);

    });    

});


router.get('/users', (req, res, next) =>{

    admin.usersLogin().then(data =>{

        res.render('admin/users', {
            menus: req.menus,
            user: req.session.user,
            data
        });

    }).catch(err =>{

        console.log(err);

    }); 

});

module.exports = router;