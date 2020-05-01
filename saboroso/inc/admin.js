var conn = require('./../inc/db');

module.exports = {

    //Traz os dados do banco da view de contadores
    dashboard(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT * FROM contadores',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results[0]);
                };

            });

        });

    },

    //Traz os dados do banco dos menus
    menus(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT * FROM tb_menus ORDER BY id',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);
                };

            });

        });

    },

    //Traz os dados do banco das
    reservations(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT * FROM tb_reservations ORDER BY id',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);
                };

            });

        });

    },

    //Traz os dados do banco dos contatos
    contacts(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT * FROM tb_contacts ORDER BY id',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);
                };

            });

        });

    },

    //Traz os dados do banco dos contatos
    emails(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT distinct email FROM tb_contacts ORDER BY email',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);
                };

            });

        });

    },

    //Traz os dados do banco dos usuarios
    usersLogin(){

        return new Promise((resolve, reject) =>{

            conn.query('SELECT * FROM tb_users ORDER BY id',

            (err, results) =>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);
                };

            });

        });

    },

    //Trata as opções a serem incluidas no menu lateral da adminsitração
    getMenus(req){

        let menus =  [

            {
                text: "Tela Inicial",
                href: "/admin/",
                icon: "fa fa-home",
                active: false
            },
            {
                text: "Menu",
                href: "/admin/menus",
                icon: "fa fa-cutlery",
                active: false
            },
            {
                text: "Reservas",
                href: "/admin/reservations",
                icon: "fa fa-calendar-check-o",
                active: false
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "fa fa-comments",
                active: false
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "fa fa-users",
                active: false
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "fa fa-envelope",
                active: false
            }

        ];

        menus.map(menu =>{

            if(menu.href === `/admin${req.url}`) menu.active = true;

        })

        return menus;
    }

}