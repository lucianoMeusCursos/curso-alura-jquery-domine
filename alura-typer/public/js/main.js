var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $('#botao-reiniciar').click(reiniciaJogo);
});

// Contando as palavras e colocando na tela
function atualizaTamanhoFrase() {
  var frase = $('.frase').text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $('#tamanho-frase');
  tamanhoFrase.text(numPalavras);
};

// Restultado das palavras digitadas realtime
function inicializaContadores() {
  campo.on('input', function () {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1; // Busca qualquer caracter, exceto espaço vazio
    $("#contador-palavras").text(qtdPalavras);
    console.log("digito");

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
  });
};

// Cronometro de tempo restante
function inicializaCronometro() {
  var tempoRestante = $('#tempo-digitacao').text();
  campo.one('focus',function () { // Funcao one só escuta o evento uma única vez
    $('#botao-reiniciar').attr('disabled', true);
    var cronometroID = setInterval(function () {
      tempoRestante--; // subtrai do tempo
      $('#tempo-digitacao').text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
};

// Checando se esta digitando certo
function inicializaMarcadores() {
  var frase = $('.frase').text();
  campo.on('input', function () {
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length)
    if (digitado == comparavel) {
      campo.addClass('borda-verde');
      campo.removeClass('borda-vermelha');
    } else {
      campo.addClass('borda-vermelha');
      campo.removeClass('borda-verde');
    }
  });
}

// Finaliza jogo
function finalizaJogo(){
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserirPlacar();
}

// Resetar cronometro
function reiniciaJogo() {
  campo.attr('disabled', false);
  campo.val("");
  $('#contador-palavras').text(0);
  $('#contador-caracteres').text(0);
  $('#tempo-digitacao').text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass("campo-desativado");
  campo.removeClass('borda-verde');
  campo.removeClass('borda-vermelha');
}
