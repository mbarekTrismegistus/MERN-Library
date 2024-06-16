const express = require("express");
const demand = require("./modules/demandeModule")
const connection = require("./config/connectDB")
const cors = require('cors')
require('dotenv').config() 


const app = express();

app.listen(3005, () => {
    console.log("demande service running")
})

connection();

app.use(express.json({limit: '10mb'}))


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))



async function getDemands(req, res, next){
    let demandsData  = await demand.find()
    res.status(200).json({demandsData: demandsData})
    next()
}


async function deleteDemande(req, res, next){
    let response = await books.findOneAndDelete({_id: req.params.id})
    res.status(200).json({message: response})
    next()
}

async function addDemande(req,res, next){
    let demandsData = req.body;

    let newDemande = new demand(demandsData)
    let demande = await newDemande.save()
    if(demande){
        res.status(200).json(demande)
        next()
    }
    else{
        res.status(500).json("something went wrong :(")
    }
}


app.get("/demands", getDemands)
app.delete("/demands/:id", deleteDemande)
app.post("/demands", addDemande)

