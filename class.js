

const fs = require ("fs")

class Contenedor {
    constructor (archivo){
        this.archivo = archivo
    }
 
async save(producto){
    try {

        const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
        const objetos = JSON.parse(data)  
        const id = objetos.length + 1
        producto.id = id
        objetos.push(producto)
        const productosString = JSON.stringify(objetos)
        await fs.promises.writeFile(`${this.archivo}`,productosString)
        console.log("Se guardo el objeto")
        console.log(objetos)
    }
    catch (err){
        console.log("No se pudo guardar archivo")
    }
    

}
async getById(id){
        const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
        const objetos = JSON.parse(data)
        const objeto= objetos.find((objeto) => objeto.id== id )
        if (objeto){
            return (objeto)
        }else{
            throw new Error ("Objeto no encontrado!!")
        }
  
  }
   async getAll(){
    try{
        const data= await fs.promises.readFile(`${this.archivo}`, "utf-8")
        const objetos = JSON.parse(data)
        return objetos
    }catch(err){
        console.log("No se consiguio info")
    }

  }
async deleteById(id){
    try{

        const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")   
        const parse = JSON.parse(data)
        const filtro= parse.filter((objeto) => objeto.id !== id )
        const string = JSON.stringify(filtro)
        fs.promises.writeFile(`${this.archivo}`,string)
        console.log(filtro)
    }catch(err){
        console.log("No se encontro ID")
    }
  }
  async deleteAll(){
      try{

          await fs.promises.writeFile(`${this.archivo}`,JSON.stringify([]))
          const data = await fs.promises.readFile(`${this.archivo}`,"utf-8") 
          console.log("Archivo vaciado") 
          console.log(data)
        }catch(err){
            console.log("No se pudo vaciar el archivo")
        }
      
  }

  getRandom(){
    const data =  fs.readFileSync(`${this.archivo}`,"utf-8")
    const parse = JSON.parse(data)
    const random = parse[Math.floor(Math.random()* parse.length)]
    console.log(random)
    return random 

  }

}

module.exports = Contenedor
