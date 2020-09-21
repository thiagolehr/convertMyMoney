const axios = require('axios')
const getUrl = data =>`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = (x) =>{
    const today = new Date()
    dayofMonth= today.getDate()
    return(today.getMonth()+1+'-'+dayofMonth+'-'+today.getFullYear())
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => { //injeção de dependências
    try{
        const x = 0
        const today = getToday(x)
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)        
        const cotacao = extractCotacao(res)
        return cotacao

    }catch(err){
        return ''
    }

}
module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getCotacao: getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao}),
    getToday,
    getUrl,
    pure: {
        getCotacao
    }
}
