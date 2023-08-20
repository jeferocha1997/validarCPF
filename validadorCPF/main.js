function validaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function () {
            return cpfEnviado.replace(/\D+/g, ''); // Substitui o que não for número por ''
        }
    });
}

validaCPF.prototype.valida = function() {
    if (typeof this.cpfLimpo === 'undefined')
        return false;

    if (this.cpfLimpo.length !== 11) // Correção de 'lenght' para 'length'
        return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    
    
    return true;
};

validaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const digito = cpfArray.reduce((ac, val) => {
        ac += (ac * Number(val));
        regressivo--;
        return ac;
    }, 0);
    
    const digito = 11 - (total % 11);
    return digito > 9 ? 0 : digito;
};

const cpf = new validaCPF('095.205.878-12');
cpf.valida();
console.log(cpf.cpfLimpo);
