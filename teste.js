
var n = 0;  // n variavel que ira receber o numero total de dados da amostra
var at
var ls
var li
var k
var h
var h_baixo
var h_alto
var h_proximo
var h_usado
var lista =[]
var lista2 = []
var objtabela = {};
var objtabela_HTML_Calc ;
var obj_valores_obtidos ;
var tentativa_tabela = 0;
var media_X    // -> valor calculado da Media (X)
var media_harmonica
var media_quadratica
var aux_moda = [];   // -> array que ira auxiliar no calculo da moda para intendificar a maior numero de dados de uma classe
var moda
var i_moda
var mediana
var desvio_medio
var variancia
var desvio_padrao
var CV_Porcentagem
var precisao = 0;
var h_precisao

/*var objtabela = {       //--> exemplo do objeto criado para fazer os calculos e contruir a tabela de frequecias
    "classe1": {
        "i": '',
        "min": "",
        "max": "",
        "fi": 0,
        'xi':(min+max)/2,    // --> xi media da classe
        "fri_P":0 ,
        'faci':0, 
        'faci_P':0,
        'fadi':0, 
        'fadi_P':0 }
           
    }
};

var objtabela_HTML_Calc_ = {       //--> exemplo do objeto criado para contruir a tabela de html de calculos
    "classe1": {
        "i": '',
        "min": "",
        "max": "",
        "fi": 0,
        'xi':(min+max)/2,    // --> xi media da classe
        "xi*fi":0;
        "fi/xi":0;
        "xi².fi": 0;
        "𝒙𝒊−𝒙̅" : 0 ;
        "𝒙𝒊−𝒙̅.fi":0;
        "(𝒙𝒊−𝒙̅)²":0;
        "(𝒙𝒊−𝒙̅)².fi":0; }
           
    }
};
*/
 










function recebe(){
    var dados = document.getElementById("entr_dados").value.replace(/,/g, ".").split(" ");   // pega o valor da id "entr_dados" e tranforma em um array (separador é espaço)
    
    if (! Number.isInteger(Number(dados[0]))) {                   // -> so entrara nesse campo se nao for um numero inteiro 
        precisao = (dados[0].length-1) - dados[0].indexOf(".");   // -> ira calcular a quantidade de numeros depois da virgula para poder ser usado no calculo do (h)
        
    };

    for ( let i of dados ){
       lista.push(Number(i));      // pegar cada elemento do array inicial que esta como string converter para numero e colocar no array lista
    };
   
    lista.sort(function(a, b){return a - b});       // organizar em ordem crescente
    n = lista.length;                              // contanto o numero total da amostra
    ls = lista[n-1];                              // ls = limite superior 
    li = lista[0];                               // li = limite inferior 
    at = ls - li;                               // at = Amplitude total dos dados da amostra
    //document.write(at);
    
    fun_k();
    fun_h();
    tabela(h_proximo);
   // document.write('<br> valor de h usado =',h_usado)
    cont_frequencias();
    mediaX();
    media_Harmonica();
    media_Quadratica();
    Moda();
    Mediana();
    Desvio_Medio();
    Variancia();
    Desvio_padrao();
    Coeficiente_Variabilidade();
    var objtabela_HTML_freq = JSON.parse(JSON.stringify(objtabela));   // --> Fazendo uma copia para usar na tabela de frequencia HTML
        objtabela_HTML_Calc = JSON.parse(JSON.stringify(objtabela));   // --> Fazendo uma copia para usar na tabela de apresentação de calculo HTML
        Tabela_HTML (objtabela_HTML_freq , objtabela_HTML_Calc);

    console.log(JSON.stringify(objtabela));


    obj_valores_obtidos = {
        'at = Amplitude total dos dados da amostra = ' : '<b>'+  at+'</b>',
        'Nº “K” de intervalos de classes = ' :'<b>'+  k+'</b>',
        'amplitude “h” dos intervalos de classes Calculada = ' :'<b>'+  h+'</b>',
        '"h" utilizado = ':'<b>'+ h_usado+'</b>',
        'media = ':'<b>'+  media_X+'</b>',
        'media harmonica = ' :'<b>'+  media_harmonica+'</b>',
        'media Quadratica = ':'<b>'+  media_quadratica+'</b>',
        'moda = ':'<b>'+  moda+'</b>',
        'mediana = ':'<b>'+  mediana+'</b>',
        'desvio medio = ':'<b>'+  desvio_medio+'</b>',
        'variancia = ':'<b>'+  variancia+'</b>',
        'desvio padrão = ':'<b>'+  desvio_padrao+'</b>',
        'Coeficiente Variabilidade = ':'<b>'+  CV_Porcentagem + " %"+'</b>'
    };

    exibe_valores_HTML(obj_valores_obtidos);

};


function recebe_tabela() {        // função usada para receber um tabela pronta
    var dados_tabela = document.getElementById("entr_tabela").value.replace(/,/g, ".").split(" ");   // pega o valor da id "entr_tabela" e tranforma em um array (separador é espaço)
    for ( let i of dados_tabela ){
        lista2.push(Number(i));      // pegar cada elemento do array inicial que esta como string converter para numero e colocar no array lista2
     };

    var aux_contagem = lista2.length;
    k = aux_contagem / 4;               // feito para receber uma tabela com 4 valores i, min , max e fi de cada classe
    h = lista2[2] - lista2[1];
    h_usado = h;
    var ponto_min = 1;
    var ponto_max = 2;
    var ponto_fi = 3;
    for ( let i=1 ; i <= k ; i++){     // --> criando o objeto tabela
        objtabela['classe'+i] = {"i":i , 'min':lista2[ponto_min] , 'max':lista2[ponto_max] , 'fi':lista2[ponto_fi] , 'xi':(lista2[ponto_min]+lista2[ponto_max])/2 , 'fri_P':0, 'faci':0, 'faci_P':0, 'fadi':0, 'fadi_P':0};
        n += lista2[ponto_fi];
        ponto_min+=4;
        ponto_max+=4;
        ponto_fi+=4;
    };
    //document.write(n);
    cont_frequencias();
    mediaX();
    media_Harmonica();
    media_Quadratica();
    Moda();
    Mediana();
    Desvio_Medio();
    Variancia();
    Desvio_padrao();
    Coeficiente_Variabilidade();
    var objtabela_HTML_freq = JSON.parse(JSON.stringify(objtabela));     // --> Fazendo uma copia para usar na tabela de frequencia HTML
        objtabela_HTML_Calc = JSON.parse(JSON.stringify(objtabela));    // --> Fazendo uma copia para usar na tabela de apresentação de calculo HTML
    Tabela_HTML (objtabela_HTML_freq , objtabela_HTML_Calc);

    console.log(JSON.stringify(objtabela));

    obj_valores_obtidos = {
        'media = ':'<b>'+  media_X+'</b>',
        'media harmonica = ' :'<b>'+  media_harmonica+'</b>',
        'media Quadratica = ':'<b>'+  media_quadratica+'</b>',
        'moda = ':'<b>'+  moda+'</b>',
        'mediana = ':'<b>'+  mediana,
        'desvio medio = ':'<b>'+  desvio_medio+'</b>',
        'variancia = ':'<b>'+  variancia+'</b>',
        'desvio padrão = ':'<b>'+  desvio_padrao+'</b>',
        'Coeficiente Variabilidade = ':'<b>'+  CV_Porcentagem + " %"+'</b>'
    };

    exibe_valores_HTML(obj_valores_obtidos);

};





function fun_k(){
    k = Math.round(1+3.322*Math.log10(n));   // Regra de “Sturges” para determinação do nº “K” de intervalos de classes (arredonta para o numero mais proximo)
    //document.write('<br> k = ',k);
    

};


function fun_h(){    // Expressão para determinação da amplitude “h” dos intervalos de classes
    h = at / k;
    h_proximo = Math.round(h);
    h_baixo = Math.floor(h);
    h_alto = Math.ceil(h);
    h_precisao = Number(h.toFixed(precisao));   // --> campo utilizado somente se o numero de dados na entrada nao for inteiro
    //document.write('<br> h = ',h);

};


function mediaX() {
    var soma = 0;
    for (let i=1 ; i <= k ; i++) {
        soma += objtabela["classe"+i].xi * objtabela["classe"+i].fi;
    };
    media_X = soma / n;
    //document.write('<br> media X = ',media_X);
};


function media_Harmonica() {
    var soma = 0;
    for (let i=1 ; i <= k ; i++) {
        soma += objtabela["classe"+i].fi / objtabela["classe"+i].xi;
    };
    media_harmonica = n / soma;
    //document.write('<br> media Harmonica = ',media_harmonica);
    
    
};

function media_Quadratica() {
    var soma = 0;
    for (let i=1 ; i <= k ; i++) {
        soma += Math.pow(objtabela["classe"+i].xi,2) * objtabela["classe"+i].fi;
    };
    media_quadratica = Math.sqrt(soma / n);
    //document.write('<br> media Quadratica = ',media_quadratica);
};


function Moda() {
    var fi_max = Math.max.apply(null,aux_moda)    // -> pega o maior valor na lista dos fi (numero de casos em cada classe)
    i_moda = 0;
    for (let i=1 ; i <= k ; i++) {
        if (fi_max == objtabela["classe"+i].fi){    // -> descobre qual a classe apresenta o maior fi (incidencia de casos)
            i_moda = i;                             // -> pega o numero dessa classe modal 
            break;    
        };
    };
    var moda_li = objtabela["classe"+i_moda].min;      // -> pega o limite inferior da classe modal para usar na formula
    if ( i_moda != 1){
        var delta_1 = objtabela["classe"+i_moda].fi - objtabela["classe"+(i_moda-1)].fi;   // -> se nao for a primeira classe executa o calculo do delta 1
    }
    else {
        var delta_1 = objtabela["classe"+i_moda].fi;  // -> se for a primeira classe por nao ter valor anterior (usa se o mesmo valor)
    };
    if (i_moda != k) {
        var delta_2 = objtabela["classe"+i_moda].fi - objtabela["classe"+(i_moda+1)].fi;  // -> se nao for a ultima classe executa o caluclo do denta 2 
    }
    else {
        var delta_2 = objtabela["classe"+i_moda].fi;     // -> se for a ultima classe por nao ter valor posterior (usa se o mesmo valor)
    };
    moda = moda_li + ((delta_1 / (delta_1 + delta_2))*h_usado);   //-> calculo da moda
    //document.write('<br> moda = ',moda);
};



function Mediana() {
    var p_medio =  Math.ceil(n/2);        // -> achar o ponto medio dos dados metade se for par se impar aredonta para cima
    var div_total = n/2;
    for (let i=1 ; i <= k ; i++) {
        if ( p_medio <= objtabela["classe"+i].faci) {     // - > achar em que classe o ponto medio esta
            var med_li = objtabela["classe"+i].min;           // -> seguencia de pegar valores para a formula
            var fiac_CANT = objtabela["classe"+(i-1)].faci;
            var fi_CME =  objtabela["classe"+i].fi;
            break;
        };
    };
    mediana = med_li + (((div_total - fiac_CANT) / fi_CME) * h_usado);  // --> !!! ATENÇÃO COM O (h) que ira usar
    //document.write('<br> mediana = ',mediana); 
};


function Desvio_Medio() {
    var soma = 0;
    for (let i=1 ; i <= k ; i++) {
        soma += Math.abs(objtabela["classe"+i].xi - media_X) * objtabela["classe"+i].fi; // -> formula desvio medio valores absolutos
    };
    desvio_medio = soma / n;
   // document.write('<br> desvio medio = ',desvio_medio);
};


function Variancia() {
    var soma = 0;
    for (let i=1 ; i <= k ; i++) {
        soma += Math.pow(objtabela["classe"+i].xi - media_X , 2) * objtabela["classe"+i].fi; // -> formula variancia
    };
    variancia = soma / n;
    //document.write('<br> variancia = ',variancia);
};

function Desvio_padrao() {
    desvio_padrao = Math.sqrt(variancia);    // -> desvio padrao raiz quadrada da variancia
   // document.write('<br> desvio padrao = ',desvio_padrao);
};

function Coeficiente_Variabilidade() {
    CV_Porcentagem = (desvio_padrao / media_X)* 100
    //document.write('<br> Coeficiente de Variabilidade porcentual = ',CV_Porcentagem ,'<br>');

}





function tabela(h_tentativa){      // -> recebe o h utilizado para a contrução da tabela e teste
    objtabela = {};
    var max= li + h_tentativa;  // !!! ATENÇÃO COM O (h) que ira usar
    var min = li;
    for ( let i=1 ; i <= k ; i++){
            objtabela['classe'+i] = {"i":i , 'min':min , 'max':max , 'fi':0 ,'xi':(min+max)/2 , 'fri_P':0, 'faci':0, 'faci_P':0, 'fadi':0, 'fadi_P':0 }  // Contrução tabela
            min = max;
            max = max + h_tentativa;  // !!! ATENÇÃO COM O (h) que ira usar
            
        };

    

    h_usado = h_tentativa  // ->  passa o valor da tentativa para o h_usado se a tentativa for correta esse h ira informar ao usuario o valor utilizado
    try {          //->  tratamento de erro pede para tentar pode ocorrer erro na contrução pois o h pode nao ser correto
        tentativa_tabela++;
    lista.forEach(cont_fi);              // --> pega o array dos numeros e chama um função para cada valor  (funçao para calculo do fi)
    function cont_fi(numeros) {         // --> Função que prenche o (fi) numero de dados ou valores em cada classe
        var cont = 1;
        while (true) {
        
            if ( objtabela["classe"+cont].min <= numeros && numeros < objtabela["classe"+cont].max ) {    // -> pega o valor min e max de cada classe para comparar com o numero buscado no array
                objtabela["classe"+cont].fi++           // --> se esse numero for pertencente a essa classe soma + 1 
                break
             }
            else if ( cont == k && objtabela["classe"+cont].min <= numeros && numeros <= objtabela["classe"+cont].max ){ // -> a difereça para o de cima é que na ultima classe se aceita o valor igual ao max
                objtabela["classe"+cont].fi++           // --> se esse numero for pertencente a essa classe soma + 1 
                break
             };    
            cont++; 
        };    
    };
    } 
    catch (err) {                      // --> ira acontecer um erro se o valor de (h) for muito baixo ira sobrar elementos dos dados
        switch (tentativa_tabela) {                    
                case 1:
                    tabela(h_alto);
                    break;
                case 2:
                    tabela(h_baixo);
                    break;
                case 3:
                    tabela(h_precisao);
                    break;
                case 4:
                    alert("DEU MERDA O ( h ) correto nao foi encontrado sua tabela esta errada, SE FUDEU ,faça na mao e insira a tabela no campo abaixo");
                    break;
                
            };
            
        

    };
    var soma = 0;
    try {
        for (let i=1 ; i <= k ; i++) {
           soma += objtabela["classe"+i].fi;

           if ( objtabela["classe"+i].fi == 0) throw 'valor de h muito alto';
        };
        if (soma != n) throw 'verifica se nao esta faltando nenhum valor';

    }
    catch (err) {
        switch (tentativa_tabela) {                    
                case 1:
                    tabela(h_alto);
                    break;
                case 2:
                    tabela(h_baixo);
                    break;
                case 3:
                    tabela(h_precisao);
                    break;
                case 4:
                    alert("DEU MERDA O ( h ) correto nao foi encontrado sua tabela esta errada, SE FUDEU ,faça na mao e insira a tabela no campo abaixo");
                    break;
                
        };
    };
    
    
   
};
   
function cont_frequencias(){             // --> função que calcula as frequencias relativas
    var faci = objtabela["classe1"].fi
    var fadi = n ;
           
    for (let i=1 ; i <= k ; i++) {
        var fri_P = objtabela["classe"+i].fi * 100 / n;      //--> calculo  frequências relativas porcentuais de cada classe ( fri (%) )
        objtabela["classe"+i].fri_P = fri_P;
        //------------------------------------------------- 
        objtabela["classe"+i].faci = faci;              // --> calculo frequências acumuladas crescentes ( Faci );
        if (i < k){
            i2 = i+1 
            faci = faci +  objtabela["classe"+i2].fi 
        };    
        //------------------------------------------------
        var faci_P = objtabela["classe"+i].faci * 100 / n;  // -->  calculo frequências acumuladas crescentes percentuais ( Faci (%) );
        objtabela["classe"+i].faci_P = faci_P;
        //--------------------------------------------------
        objtabela["classe"+i].fadi = fadi;              // -->  calculo  frequências acumuladas decrescentes ( Fadi ); 
        fadi = fadi -  objtabela["classe"+i].fi
        //--------------------------------------------------
        var fadi_P = objtabela["classe"+i].fadi * 100 / n;  // -->  calculo  frequências acumuladas decrescentes percentuais ( Fadi (%) );
        objtabela["classe"+i].fadi_P = fadi_P;
        //--------------------------------------------------
        aux_moda.push(objtabela["classe"+i].fi)          // --> adicionando os numeros do fi a array de aux do calculo da moda

    };
};


// -------------------------------- Manipulação HTML --------------------------------------------------


function Tabela_HTML (obj , obj_c ){                            // ---> gerando a tabela em HTML com as frquencias  e a tabela de calculos
    var tbody = document.querySelectorAll("tbody");       // --> pega todos os elemento tbody 
    
    var soma_fi =0;    // --> variavel auxiliar para mostrar a soma dos fi na tabel HTML
    var soma_fri =0;    // --> variavel auxiliar para mostrar a soma dos fri% na tabel HTML
    var soma_xi_x_fi = 0;   // --> 
    var soma_a_x_fi =0;
    var soma_fi_div_xi = 0;
    var soma_xi2_x_fi =0;
    var soma_xi_x_x_fi = 0;
    var soma_xi_x2_fi=0;


    for (let i=1 ; i <= k ; i++) {
        
       

        obj["classe"+i].min = obj["classe"+i].min + ' |------ ' +  obj["classe"+i].max;       // --> pega o valor min e max da classe e formata e coloca junto
        obj_c["classe"+i].min = obj_c["classe"+i].min + ' |------ ' +  obj_c["classe"+i].max;
        

        delete obj["classe"+i].max                                 // --> apaga o objeto max que nao ira mais ser usado na tabela de frequecia
        
        delete obj_c["classe"+i].max                                 // --> apaga o objeto max que nao ira mais ser usado na tabela de visualização de calculo
        delete obj_c["classe"+i].fri_P                               // --> apaga o objeto que nao ira mais ser usado na tabela de visualização de calculo
        delete obj_c["classe"+i].faci                                 // --> apaga o objeto que nao ira mais ser usado na tabela de visualização de calculo
        delete obj_c["classe"+i].faci_P                                 // --> apaga o objeto que nao ira mais ser usado  na tabela de visualização de calculo
        delete obj_c["classe"+i].fadi                                 // --> apaga o objeto que nao ira mais ser usado na tabela de visualização de calculo
        delete obj_c["classe"+i].fadi_P                                // --> apaga o objeto que nao ira mais ser usado na tabela de visualização de calculo
        

        obj_c["classe"+i]["xi*fi"] = obj_c["classe"+i].xi * obj_c["classe"+i].fi;        // --> faz os calculos que tem q aparecer na tabela auxiliar e coloca no objeto


        if (i < i_moda){                               // --> para aparecer na tabela os valores para o calculo da media abreviada
            obj_c["classe"+i]["α"] = (i_moda - i)*-1;   // --> depois de achado o falor de maior freq o mesmo que o da moda e colocado os valores de alpha
        }
        else if (i == i_moda){
            obj_c["classe"+i]["α"] = 0;
        }
        else {
            obj_c["classe"+i]["α"] = i - i_moda;
        };



        obj_c["classe"+i]["α.fi"] = obj_c["classe"+i]["α"] * obj_c["classe"+i].fi;
        obj_c["classe"+i]["fi/xi"] = obj_c["classe"+i].fi / obj_c["classe"+i].xi;
        obj_c["classe"+i]["xi².fi"] = Math.pow(obj_c["classe"+i].xi,2) * obj_c["classe"+i].fi;
        obj_c["classe"+i]["𝒙𝒊−𝒙̅"] = Math.abs(obj_c["classe"+i].xi - media_X) ;
        obj_c["classe"+i]["𝒙𝒊−𝒙̅.fi"] = obj_c["classe"+i]["𝒙𝒊−𝒙̅"] * obj_c["classe"+i].fi ;
        obj_c["classe"+i]["(𝒙𝒊−𝒙̅)²"] = Math.pow(obj_c["classe"+i]["𝒙𝒊−𝒙̅"],2);
        obj_c["classe"+i]["(𝒙𝒊−𝒙̅)².fi"] = obj_c["classe"+i]["(𝒙𝒊−𝒙̅)²"] * obj_c["classe"+i].fi;



        /*obj_c["classe"+i].media_normal = obj_c["classe"+i].xi * obj_c["classe"+i].fi;

        obj_c["classe"+i].media_harm = obj_c["classe"+i].fi / obj_c["classe"+i].xi;
        obj_c["classe"+i].media_quadr = Math.pow(obj_c["classe"+i].xi,2) * obj_c["classe"+i].fi;
        obj_c["classe"+i].desvio_med = obj_c["classe"+i].xi - media_X ;
        obj_c["classe"+i].desvio_med2 = obj_c["classe"+i].desvio_med * obj_c["classe"+i].fi ;
        obj_c["classe"+i].varianc = Math.pow(obj_c["classe"+i].desvio_med,2);
        obj_c["classe"+i].varianc2 = obj_c["classe"+i].varianc * obj_c["classe"+i].fi;
        */


        soma_fi +=  obj["classe"+i].fi;
        soma_fri+=  obj["classe"+i].fri_P;
        soma_xi_x_fi +=  obj_c["classe"+i]["xi*fi"];
        soma_a_x_fi += obj_c["classe"+i]["α.fi"];
        soma_fi_div_xi +=  obj_c["classe"+i]["fi/xi"];
        soma_xi2_x_fi += obj_c["classe"+i]["xi².fi"];
        soma_xi_x_x_fi +=  obj_c["classe"+i]["𝒙𝒊−𝒙̅.fi"];
        soma_xi_x2_fi += obj_c["classe"+i]["(𝒙𝒊−𝒙̅)².fi"];


        var linha_T = document.createElement("tr");         // --> cria uma linha na tabela de visualização de frequencia para cada classe
        var linha_T2 = document.createElement("tr");        // --> cria uma limha na tabela de visualzaçao de calculo para cada classe
        
        for (var x in obj["classe"+i] ) {                    // --> dentro da classe n - ira ate as chaves 
            var coluna_T = document.createElement("td");    // --> criara uma coluna para a tabela para cada elemento na classe
            coluna_T.innerHTML = obj["classe"+i][x];        // --> prenche a coluna com o valor acessado com a chave
            linha_T.appendChild(coluna_T);                  // --> coloca a coluna como filho da classe
            
        };

        for (var x in obj_c["classe"+i] ) {                    // --> dentro da classe n - ira ate as chaves 
            var coluna_T2 = document.createElement("td");    // --> criara uma coluna para a tabela para cada elemento na classe
            coluna_T2.innerHTML = obj_c["classe"+i][x];        // --> prenche a coluna com o valor acessado com a chave
            
            if ( x == "xi*fi"){                                 // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "media_N";                         
                coluna_T2.attributes.setNamedItem(name); 
            }

            else if (x == "α" || x == "α.fi" ){                 // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "media_AB";                         
                coluna_T2.attributes.setNamedItem(name); 
            }

            else if (x == "fi/xi" ){                            // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "media_Har";                         
                coluna_T2.attributes.setNamedItem(name);
            }

            else if (x == "xi².fi" ){                           // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "media_Qua";                         
                coluna_T2.attributes.setNamedItem(name);
            }

            else if (x == "𝒙𝒊−𝒙̅" || x == "𝒙𝒊−𝒙̅.fi" ){               // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "desvio_Med";                         
                coluna_T2.attributes.setNamedItem(name);
            }

            else if ( x == "(𝒙𝒊−𝒙̅)²" || x == "(𝒙𝒊−𝒙̅)².fi" ) {                                              // --> dando name as tags conforme o calculo
                let name = document.createAttribute("name");       
                name.value = "variancia";                         
                coluna_T2.attributes.setNamedItem(name);
            };





            linha_T2.appendChild(coluna_T2);                  // --> coloca a coluna como filho da classe
            
        };



        tbody[0].appendChild(linha_T);   // --> pega o [0] no array que volta o tbody da 1 tabela de frequencia
        tbody[1].appendChild(linha_T2);  // --> pega o [1] no array que volta o tbody da 2 tabela de calculos


      
    };

    var pos_soma = document.querySelectorAll("td[name='soma_fi']");
    pos_soma[0].innerHTML = soma_fi;
    pos_soma[1].innerHTML = soma_fi;

    pos_soma = document.querySelectorAll("td[name='soma_fri']");
    pos_soma[0].innerHTML = soma_fri;

    pos_soma = document.getElementById('media_N');
    pos_soma.innerHTML = soma_xi_x_fi;

    pos_soma = document.getElementById('media_AB');
    pos_soma.innerHTML = soma_a_x_fi;

    pos_soma = document.getElementById('media_Har');
    pos_soma.innerHTML = soma_fi_div_xi;

    pos_soma = document.getElementById('media_Qua');
    pos_soma.innerHTML = soma_xi2_x_fi;

    pos_soma = document.getElementById('desvio_Med');
    pos_soma.innerHTML = soma_xi_x_x_fi;

    pos_soma = document.getElementById('variancia');
    pos_soma.innerHTML = soma_xi_x2_fi;

};


function exibe_valores_HTML(obj){
    var posi = document.querySelectorAll("table");

    for (let x in obj){
       var parag = document.createElement("p")
       parag.innerHTML= x + obj[x];

       if ( x == 'media = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "media_N";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'media harmonica = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "media_Har";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'media Quadratica = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "media_Qua";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'moda = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "moda";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'mediana = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "mediana";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'desvio medio = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "desvio_Med";                         
            parag.attributes.setNamedItem(name); 
        } 

        else if ( x == 'variancia = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "variancia";                         
            parag.attributes.setNamedItem(name); 
        }

        else if ( x == 'desvio padrão = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "desvio_Pad";                         
            parag.attributes.setNamedItem(name); 
        }

        else if ( x == 'Coeficiente Variabilidade = '){                                 // --> dando name as tags conforme o calculo
            let name = document.createAttribute("name");       
            name.value = "Coef_variab";                         
            parag.attributes.setNamedItem(name); 
        };

        document.body.insertBefore(parag,posi.nextSibling);

    };

};
