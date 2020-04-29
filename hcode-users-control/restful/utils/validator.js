module.exports = {
    user:(app, req, res) => {
        //Validar campos antes de inserir no banco de dados
        req.assert('_name', 'O nome é obrigatório').notEmpty();
        req.assert('_email', 'O email é obrigatório').notEmpty();
        req.assert('_email', 'O email é inválido').isEmail();

        let errors = req.validationErrors();

        if(errors){

            app.utils.error.send(errors, res, res);

            return false;
            
        }else{

            return true;

        }
    }
}