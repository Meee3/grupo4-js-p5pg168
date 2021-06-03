//Variaveis
var listaDeVoos = Array(0)
var listaDeLugaresDisponiveis = Array(0)
var listaDeStatus = ["Indisponivel","Disponivel"]
var listaDeLetras = ['A','B','C','D','E','F','G','H','I','J']
var clientes = Array()
var clienteEmVoo = Array()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function onLoadHTML(){
    for(var i = 0; i < 37; i++){
        var a = ""+getRandomInt(1000, 9999)
        listaDeVoos.push(a)
        listaDeLugaresDisponiveis.push(getRandomInt(10, 200))
    }
    var tabela_esquerda = document.getElementById("tabela_esquerda")
    var tabela_direita = document.getElementById("tabela_centro")
    var html = "<th>Nº Voo</th><th>Status</th>"
    for(var i = 0; i < 37; i++){
        html += `<tr><td id="voo${i+1}">${listaDeVoos[i]}</td><td id="status${i+1}">${listaDeStatus[getRandomInt(0,2)]}</td></tr>`
    }
    tabela_esquerda.innerHTML+= html
    html = "<th>Disponível</th><th>Ocupado</th>"
    for(var i =0; i<37; i++){
        html += `<tr><td id="disp${i+1}">${listaDeLugaresDisponiveis[i]}</td>`
        html += `<td id="ocup${i+1}">${200 - listaDeLugaresDisponiveis[i]}</td></tr>`
    }
    tabela_centro.innerHTML = html
}
function apagarFormulario(){
    document.getElementById("pMsg").innerHTML=""
    document.getElementById("id_cliente").value = ""
    document.getElementById("n_voo").value = ""

}
function enviarFormulario(){
    var idClienteCampo = document.getElementById("id_cliente")
    var nVooCampo = document.getElementById("n_voo")
    var msgParagrafo = document.getElementById("pMsg")

    if(nVooCampo.value.length != 4){
        msgParagrafo.innerHTML="Número de voo inválido!"
        return;
    }
    var t = clientes.indexOf(idClienteCampo.value)
    
    if(t != -1 && nVooCampo.value == clienteEmVoo[t]){
        msgParagrafo.innerHTML = "Um cliente não pode ocupar mais de um lugar"
        return
    }
    var vooIndex = listaDeVoos.indexOf(nVooCampo.value)
    if(vooIndex == -1){
        msgParagrafo.innerHTML="Número de voo inválido!"
        return;
    }
    var vooId = "voo"+(vooIndex+1)
    var status = "status"+(vooIndex+1)
    var dispId = "disp"+(vooIndex+1)
    var ocupId = "ocup"+(vooIndex+1)
    if(idClienteCampo.value.toString().length > 5){
	msgParagrafo.innerHTML = "Número do ID do cliente é inválido"
	return;
    }
    if(document.getElementById(status).innerHTML.toLowerCase()[0] == 'i'){
        msgParagrafo.innerHTML="Não há lugares disponiveis"
        return
    }
    if(listaDeLugaresDisponiveis[vooIndex] <= 0){
        msgParagrafo.innerHTML="Não há lugares disponiveis"
        document.getElementById(status).innerHTML="Indisponivel"
        return
    }
    --listaDeLugaresDisponiveis[vooIndex]
    document.getElementById(dispId).innerHTML=listaDeLugaresDisponiveis[vooIndex]
    document.getElementById(ocupId).innerHTML = 200 - listaDeLugaresDisponiveis[vooIndex]

    var tabela_direita = document.getElementById("tabela_direita")
    clientes.push(idClienteCampo.value)
    clienteEmVoo.push(listaDeVoos[vooIndex])
    tabela_direita.innerHTML += `<tr><td>${idClienteCampo.value}</td><td>${listaDeVoos[vooIndex]}</td></tr>`
}