// import moment from 'moment.js';
import moment from "moment/moment";

//MANIPULANDO DATAS COM MOMENT

/*
ira ter algumas etapas

A primeiro momento será quando a revisão chega a primeira vez no feed, neste caso ele é registrado no banco primeiramente já com uma data para revisão, vai cadastrar uma data que conta 5 horas a partir do momento instanciado (ou hora que ela foi criada); também é registrado um contador em 0;

adiciona 5 horas
const reviewDate = moment().add(5, 'h');
formata para dia-mes-ano Hora:min
a.format('DD-MM-YYYY');
converte para string
a.toString()

const date = {
    futureDate: reviewDate,
    counter: 0
}

Só aparecerá no feed do reviews daqui a 5 horas, porque a data/hora é comparada com a data/atual, será usado o isSame e isBefore do moment para comparar a data futura registrada neste post com a data atual; A query seria 

pega data atual:
const currentDate = moment().format('DD-MM-YYYY');
pegue todas as revisoes que o campo futureDate === dataAtual;

No caso, é só apenas renderizar na rota as reviews que vier;

Se o tamanho das reviews for maior ou igual a 10 (se houver mais de 10 revisões no feed), o navbar indica que há revisões pendentes:

if(reviews.lenght >= 10){
    notification = true
}

notification servirá para acionar o css do navbar;

caso o usuário opte por ainda estar revizando;
Ao clicar no btn já revisei, a revisao é atualizada para uma nova data de revisao e com um novo contador;
A criação de nova data de revisão é feita baseada no contador que estiver cadastrado, se o contador estiver em determinado ponto, uma data específica é gerada de acordo;


*/

export const dateChangeReview = (currentCounter, stillReviwing) => {
    let counter = currentCounter;
    let newDate = moment();
    console.log('antes da alteração do swithch:  Data atual: ', newDate.format("DD-MM-YYYY HH:mm"), 'contador atual: ', counter);

    if (stillReviwing) {
        counter = counter + 1;

        switch (counter) {
            case 1:
                newDate = newDate.add(1, 'd');
                break;
            case 2:
                newDate = newDate.add(2, 'd');
                break;
            case 3:
                newDate = newDate.add(3, 'd');
                break;
            case 4:
                newDate = newDate.add(5, 'd');
                break;
            case 5:
                newDate = newDate.add(7, 'd');
                break;
            case 6:
                newDate = newDate.add(14, 'd');
                break;

            default:
                if (counter > 6) {
                    counter = counter
                    newDate = newDate.add(15, 'day');
                }
        }
    }

    newDate = newDate.format('DD-MM-YYYY HH:mm').toString();
    console.log('depois da alteração:  Data alterada: ', newDate, 'contador alterado: ', counter);
    const result = {
        date: newDate,
        count: counter
    }

    return result;
}