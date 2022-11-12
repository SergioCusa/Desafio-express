import { json, Router } from "express";
const prodFaker = Router()

import express from "express";
const app = express()

import genUser from "./classFaker.js";


app.use(express.json())

const lista = []

prodFaker.get("/", async (req,res)=>{
    const { cant = 5 } = req.query;

    for (let i = 0; i < cant; i++) {
        lista.push({ id: lista.length + 1, ...genUser() })
    }
    res.send(lista)

})

export default prodFaker
