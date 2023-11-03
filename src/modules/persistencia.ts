import * as fs from "fs";
import { Vault } from "./entidades";
import { PersistenciaError } from "./persistenciaExceptions";



class SerializeVault{
    _historicArray:Vault[];

    constructor(){
        this._historicArray = [];
    }

    async salvarCofrinho(cofrinho:Vault, nomeArquivo:string){
      return this._writeFile("save",nomeArquivo,cofrinho)
      .then((value:Vault) =>{
            this._historicArray.push(value);
            return cofrinho;
       }).catch((err) =>{
            console.error(err);
            return cofrinho;
       });
    }

    lerCofrinho(nomeArquivo:string):Promise<Vault>{
        return this._readFile("save", nomeArquivo)
        .then((value:string) => JSON.parse(value))
        .then((value) => {
            const cofre = new Vault(value);
            return cofre;
        });
        
        
    }

    _writeFile(diretorio: string, nomeArquivo: string, cofrinho: Vault): Promise<Vault> {
        
        if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio);
        }

        return new Promise<Vault>((resolve, reject) =>{
            fs.writeFile(`${diretorio}/${nomeArquivo}.txt`, JSON.stringify(cofrinho.toJson()),'utf-8', (err) => {
                if (err){
                    reject(new PersistenciaError(`Erro ao salvar ${nomeArquivo} no diretorio ${diretorio}`));
                }
                else{
                    resolve(cofrinho);
                }
            })
        });
    
        
    }

    _readFile(diretorio:string, nomeArquivo:string):Promise<string> {
        return new Promise<string>((resolve, reject) => {
                fs.readFile(`${diretorio}/${nomeArquivo}.txt`, 'utf-8', (err, value) =>{
                    if(err){
                        reject(err);   
                    }
                    else{
                        resolve(value);
                    }
                })
            
        });
       
    }
}

export {SerializeVault}