// npm install jest --save-dev
// npm install ts-jest --save-dev
// npm install @types/jest --save-dev


import {Vault, Moeda} from "../src/modules/entidades"
import {SerializeVault} from "../src/modules/persistencia"

describe('testando a implementacao do cofrinho (Questão 2)', () => {
    
    let cofre:Vault;
    let centavos50:Moeda;
    let centavos20:Moeda;

    beforeAll(() => {
        centavos50 = new Moeda(0.5,"50 Centavos");
        centavos20 = new Moeda(0.2,"20 Centavos");
    });
    
    beforeEach(() => {
        cofre = new Vault();
    })

    test('Criando um cofre vazio', () => {
        expect(cofre.calcularTotal()).toBe(0);
    });

    test('Adicionando 1 moeda no cofre', () => {
        cofre.adicionar(centavos50);
        expect(cofre.calcularTotal()).toBeCloseTo(0.5, 1);
        });

    test('Adicionando 3 moedas no cofre', () => {
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos20);
        expect(cofre.calcularTotal()).toBeCloseTo(0.6, 1);
        });

    test('Serializando cofrinho para Json', () => {
        cofre.adicionar(centavos20);
        let expectedString:string = "{\"_array\":[{\"valor\":0.2,\"nome\":\"20 Centavos\"}]}";
        expect(JSON.stringify(cofre.toJson())).toEqual(expectedString);
    })

    
});

describe('testando a implementação de cofrinho (Questão 3)', () => {
    
    let cofre:Vault;
    let centavos20:Moeda;
    let centavos50:Moeda;
    let centavos10:Moeda;

    beforeAll(() => {
        centavos20 = new Moeda(0.2,"20 Centavos");
        centavos50 = new Moeda(0.5,"50 Centavos");
        centavos10 = new Moeda(0.1,"10 Centavos");
    })

    beforeEach(() => {   
        cofre = new Vault();
        cofre.adicionar(centavos10);
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos50);
    });
    test('Instancia da menor moeda armazenada', () => {
 
        expect(cofre.instanciaMenorMoedaArmazenada()).toBe(centavos10);
    });

    test('Valor da menor moeda armazenada', () => {
        
        expect(cofre.valorMenorMoedaArmazenada()).toBe(centavos10.getValor());
    })

    test('Frequencia das moedas armazenadas', () => {
        
        cofre.adicionar(centavos10);

        let expectedMap:Map<string,number> = new Map()
        expectedMap.set("20 Centavos",1);
        expectedMap.set("50 Centavos",1);
        expectedMap.set("10 Centavos",2);

        expect(cofre.frequenciaCadaMoeda()).toMatchObject(expectedMap);
    })
});

describe('Testando leitura e escrita assincrona', () => {
   
    let cofre:Vault;
    let centavos20:Moeda;
    let centavos50:Moeda;
    let centavos10:Moeda;
    let serializer:SerializeVault;

    beforeAll(() => {
        serializer = new SerializeVault();
        cofre = new Vault();
        centavos20 = new Moeda(0.2,"20 Centavos");
        centavos50 = new Moeda(0.5,"50 Centavos");
        centavos10 = new Moeda(0.1,"10 Centavos");

    })

    beforeEach(() => { 
        cofre.adicionar(centavos10);
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos50);
    })

    test('Escrita de um cofre', async () => {
        let cofreEscrito = await serializer.salvarCofrinho(cofre,"testando")
        expect(cofreEscrito).toEqual(cofre);
    })

    test('Leitura de um cofre', async () => {
        serializer.salvarCofrinho(cofre,"testando")
        let cofreLido:Vault = await serializer.lerCofrinho("testando");
        expect(cofreLido).toEqual(cofre);
    })
});
