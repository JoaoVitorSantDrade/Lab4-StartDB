class Moeda {
    
    valor: number;
    nome: string;
    constructor(valor:number, nome:string){
        this.valor = valor;
        this.nome = nome;
    }

    getValor():number{
        return this.valor;
    }
    getNome():string{
        return this.nome;
    }

    toJson(){
        return {
            valor: this.getValor(),
            nome: this.getNome(),
        }
    }
}

class Vault {
    _array: Moeda[];
    constructor(){
        this._array = [];
    }

    adicionar(m:Moeda){
        this._array.push(m);
    }

    calcularTotal():number{
        return this._array.reduce((prev, atual) => {
            return prev + atual.getValor();
        }, 0)
    }
    
    instanciaMenorMoedaArmazenada():Moeda {
        return this._array.reduce((prev, current) => (current < prev ? current : prev), this._array[0])
    }

    valorMenorMoedaArmazenada():number {
        return this.instanciaMenorMoedaArmazenada().getValor();
    }

    frequenciaCadaMoeda():Map<string,number>{
        let mapFrequencia = new Map<string,number>();
        this._array.map(moeda => {
            if(!mapFrequencia.has(moeda.getNome())){
                mapFrequencia.set(moeda.getNome(), 1);
            }
            else{
                let acc:any = mapFrequencia.get(moeda.getNome());
                mapFrequencia.set(moeda.getNome(), acc + 1)
            }
        })
        return mapFrequencia;
    }

    toJson(){
       return {
            moedas: this._array.map((moeda) => moeda.toJson()),
            total: this.calcularTotal(),
       }
    }

}

export {Vault, Moeda}