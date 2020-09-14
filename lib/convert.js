const convert = (cotacao, quantidade) => {
    cotacao=String(cotacao).replace(",", ".") 
    return cotacao * quantidade 
}
const toMoney = valor => {
    valor = String(valor).replace(",", ".") 
    valor =parseFloat(valor).toFixed(2)
    return valor
}

module.exports = {
    convert,
    toMoney
}