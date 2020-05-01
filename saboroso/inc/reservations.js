var conn = require('./db');

module.exports = {

    //Renderiza a tela após a execução do post no banco de dados
    render(req, res, error, success){
        res.render('reservations', {
            title: 'Reservas | Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
        });
    },

    //Salva na tabela reservations uma reserva realiziada pelo site na pagina de reservations
    save(fields){
        return new Promise((resolve, reject) =>{

            let date = fields.date.split('/');
            date = `${date[2]}-${date[1]}-${date[0]}`;

            conn.query(`
                INSERT INTO tb_reservations (name, email, people, date, time)
                VALUES (?,?,?,?,?)`,
                [
                    fields.name,
                    fields.email,
                    fields.people,
                    date,
                    fields.time,
                ], (err, results) =>{

                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    };
                }
            );

        });
        
    }

}