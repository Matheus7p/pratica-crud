var dados = []

function ApagaRegistro(id) {
    let _confirm = confirm("Deseja realmente excluir esse personagem da lista?")

    if (_confirm) {
        for(let i = 0; i < dados.length; i++){
            if(dados[i].ID == id){
                dados.splice(i, 1)
            }
        }
        PopulaTabela()
    }
}

function EditaRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function(item){
        if (item.ID == id){
            $("#hdID").val(item.ID)
            $("#txtNome").val(item.Nome)
            $("#txtRecompensa").val(item.Recompensa)
            $("#txtAkuma").val(item.Akuma)
            $("#txtOcupacao").val(item.Ocupacao)
        }
    })

}

function PopulaTabela() {
    if(Array.isArray(dados)){

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (item){
            //TEMPLATE STRING
            $("#tblDados tbody").append(`<tr>
            <td>${item.ID}</td>
            <td>${item.Nome}</td>
            <td>${item.Recompensa}</td>
            <td>${item.Akuma}</td>
            <td>${item.Ocupacao}</td>
            <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"> <i class="far fa-edit"></i> </button</td>
            <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"> <i class="fas fa-trash-alt"></i> </button></td>
            </tr>`)
        })
    }
}

$(function () {
    // EXECUTA AO CARREGAR DA TELA
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if(dados){
        PopulaTabela()
    }

    $("#btnSalvar").click(function() {
        //EVENTO CLICK DO BOTÃO DE SALVAR INFORMAÇÕES DO PERSONAGEM
        let _id = $("#hdID").val()
        let Nome = $("#txtNome").val()
        let Recompensa = $("#txtRecompensa").val()
        let Akuma = $("#txtAkuma").val()
        let Ocupacao = $("#txtOcupacao").val()


        if (!_id || _id == "0" ){
            let registro = {}
            registro.Nome = Nome
            registro.Recompensa = Recompensa
            registro.Akuma = Akuma
            registro.Ocupacao = Ocupacao

            registro.ID = dados.length + 1
            dados.push(registro) 

        }else{
            dados.forEach(function(item) {
                if (item.ID == _id){
                    item.Nome = Nome
                    item.Recompensa = Recompensa
                    item.Akuma = Akuma
                    item.Ocupacao = Ocupacao
                }
            })
        }
        

        alert("Informações salvas com sucesso")
        $("#modalRegistro").modal("hide")

        //LIMPEZA DOS CAMPOS DE INFORMAÇÕES
        $("#hdID").val("0")
        $("#txtNome").val("")
        $("#txtRecompensa").val("")
        $("#txtAkuma").val("")
        $("#txtOcupacao").val("")

        PopulaTabela()    
    })

})
