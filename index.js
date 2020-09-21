const express = require('express')
const { readFileSync } = require('fs')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000

const apiBCB = require('./lib/api-bcb')

 const {
    convert,
    toMoney
 } = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res) =>{
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const {cotacao, quantidade} = req.query
    if(cotacao && quantidade){
        const conversao = convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: toMoney(cotacao),
            quantidade: toMoney(quantidade),
            conversao: toMoney(conversao)
        })
    }else{
        res.render('cotacao',{
            error: 'Valores inválidos'
        })
    }

})

app.listen(port, err =>  {
    if(err){
        console.log('Not possible to launch')
    }else{
        console.log('ConvertMyMoney is online')
    }
})