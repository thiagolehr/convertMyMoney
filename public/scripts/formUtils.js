$(function(){
    $('#form').submit(function(){
        if($('.cotacao').val() ==='' || $('.qtd').val() ==='' ){
            alert('É necessário preencher todas as infos!')
            return false
        }
    })
})