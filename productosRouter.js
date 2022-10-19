import { Router } from "express"
const router = Router()
import multer from "multer"
import connection from "./db.js"
import dbContainer from "./class.js"
const cont = new dbContainer(connection,"menu") 
 
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
    res.render("form",{
      data
    })
  })

router.get("/:id",async (req,res)=>{
  try {
      const {id} = req.params
        const data = await cont.getById(id)
        res.send(data)
    }catch(e){
        res.status(404).send({error:true, msj: e.message})
    }    
  
  })
  
router.post("/", upload.single("thumbnail") , async (req,res)=>{
  try{
      const {nombre,precio,url} = req.body
      cont.save({nombre,precio,url})
      const data = await cont.getAll()
      res.render("productos",{data})
  }catch(e){
      console.log(e)
     }
  })
   
router.put("/:id", async (req, res) => {
    try {
      const {nombre,precio,url} = req.body
      const {id} = req.params
      const result = await cont.updateById({nombre,precio,url},id)
      res.send({result})
    } catch (err) {
      res.status(404).send(err.msg)
    }
  })
  
router.delete("/:id", async (req,res)=>{
    try {
        const { id } = req.params
        const result = await cont.deleteById(id)
        res.send({result})
      } catch (err) {
        res.status(404).send(err.msg)
      }
  })


export default router