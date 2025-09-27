import express from "express"
import 'dotenv/config'
const app=express()
const port=process.env.PORT || 3000
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Server 3000")
})
let flavors=[]
app.post('/ice-cream',(req,res)=>{
    const {name,price} = req.body
    const newFlav={id:flavors.length,name,price}
    flavors.push(newFlav)
    res.status(201).send("Added Flavour")
})
app.get('/ice-cream',(req,res)=>{
    res.status(202).send(flavors)
})
app.get('/ice-cream/:id',(req,res)=>{
    const ice=flavors.find(icecream => icecream.id===parseInt(req.params.id))
    if(!ice){
        return res.status(404).send('Ice Cream Not found')
    }
    res.status(202).send(ice)
})
app.put('/ice-cream/:id',(req,res)=>{
    const ice=flavors.find(icecream => icecream.id===parseInt(req.params.id))
    if(!ice){
        return res.status(404).send('Ice Cream Not found')
    }
    const {name,price}=req.body
    ice.name = name
    ice.price=price
    return res.status(204).send('Updated')
})
app.delete('/ice-cream/:id',(req,res)=>{
    flavors = flavors.filter(i => i.id !== parseInt(req.params.id))
    return res.status(200).send('Deleted')
})
app.listen(port,()=>{
    console.log('Server listening always.....');
    
})