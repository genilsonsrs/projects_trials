class NeociacoesView {

    constructor(elemento){

        this._elemento = elemento;

    }

    template(model){

        return `
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    
                    <tbody id="tabela-negociacoes">
                    ${model.negociacoes.map(n => {
                        return `
                          <tr>
                              <td>${n._data}</td>
                              <td>${n._quantidade}</td>
                              <td>${n._valor}</td>
                              <td>${n.volume}</td>
                          </tr>
                        `
                    }).join('')}
                    </tbody>
                    
                    <tfoot>
                        <td colspan="3"></td>
                        <td>
                            ${ model.negociacoes.reduce((total, n) => total + parseFloat(n.volume), 0.00)}
                        </td>
                    </tfoot>
                </table>
            `;
    }

    update(model){

        this._elemento.innerHTML = this.template(model);

    }

}