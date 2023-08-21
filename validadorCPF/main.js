function ValidaCPF(cpfEnviado) { //  função construtora d
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function () {
            return cpfEnviado.replace(/\D+/g, ''); // Substitui o que não for numeral por ''
        }
    });
}

ValidaCPF.prototype.valida = function() {
    if (typeof this.cpfLimpo === 'undefined' || this.cpfLimpo.length !== 11) {
        return false;
    }

    if (this.isSequencial()) {
        return false;
    }

    const cpfParcial = this.cpfLimpo.slice(0, -2); // Pegar os 9 primeiros dígitos
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val)); 
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencial = function () { 
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

const cpf = new ValidaCPF('095.205.878-12');
if (cpf.valida()) {
    console.log('CPF Válido');
} else {
    console.log('CPF Inválido');
}
