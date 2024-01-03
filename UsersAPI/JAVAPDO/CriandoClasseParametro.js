class Filme {
    constructor(titulo,ano,diretor,ator){
        this.titulo=titulo;
        this.ano=ano;
        this.diretor=diretor;
        this.ator=ator;
       
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


var vingadores = new Filme('OS VINGADORES',2010,'Natã','TOM');  //objeto ,passando valores em parametro