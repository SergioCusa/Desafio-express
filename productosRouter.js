const express = require("express")
const {Router}= express
const router = Router()
const multer = require ("multer")
const contenedor = require("./class")
const cont = new contenedor("./productos.json") 
 
// *Multer configurado
const storage = multer.diskStorage({
  filename: (req,file,cb)=>{
    cb(null,file.fieldname)
  },
  destination:(req,file,cb)=>{
    cb(null,"uploads")
  },
})

// *Multer ejecutado
const upload = multer({storage})



router.get("/", async (req,res)=>{
   
    const data = await cont.getAll()
    console.log(data)
    res.send(data)
  })

router.get("/:id",async (req,res)=>{
    const {id} = req.params
    try {
        const data = await cont.getById(id)
        res.send(data)
    }catch(e){
        res.status(404).send({error:true, msj: e.message})
    }    
  
  })
  
router.get("/productoRandom",(req,res)=>{
    
    res.send(cont.getRandom())
  })
  
router.post("/", upload.single("thumbnail") , async (req,res)=>{
    const {file} = req
    const {title,price,thumbnail}= req.body
    await cont.save({title,price,thumbnail})
    res.render("main")
    
  })
  
router.put("/:id", (req, res) => {
    try {
      const { id } = req.params
      const prodNuevo = req.body
      const idInt = parseInt(id)
      res.send(cont.updateById(idInt, prodNuevo))
    } catch (err) {
      res.status(404).send(err.msg)
    }
  })
  
router.delete("/:id",(req,res)=>{
    try {
        const { id } = req.params
        res.send(cont.deleteById(parseInt(id)))
      } catch (err) {
        res.status(404).send(err.msg)
      }
  })


module.exports = router  