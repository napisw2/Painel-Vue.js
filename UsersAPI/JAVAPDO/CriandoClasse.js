class Filme {
    constructor(){
        this.titulo= '';
        this.ano=0;
        this.genero= '';
        this.diretor='';
        this.atores= [];
        this.duracao=0;
    }
    Reproduzir(){
        console.log('Reproduzir');
    }
    Pausar(){
        console.log('Pausar');
    }
    Fechar(){
        console.log('Fechar');
    }
}


var vingadores = new Filme();  //objeto  
vingadores.Reproduzir();
vingadores.Pausar();
vingadores.titulo='OS VINGADORES';
vingadores.ano=2009;
console.log('ANO DE LANÇAMENTO = ' + vingadores.ano);


var hulk = new Filme();        //objeto 