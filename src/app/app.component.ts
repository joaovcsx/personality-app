import { Component }                      from '@angular/core';
import { Question, Alternative, Animal }  from '../interfaces/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  animals: Array<Animal>;
  animalCurrent: Animal;
  questions: Array<Question>
  questionCurrent: Question;
  response: {[key: string]: Alternative} = {};
  buttonPreviousDisabled: boolean = true;
  buttonNextDisabled: boolean = false;
  buttonSend: boolean = false;
  progressValue: number = 0;
  progressTotal: number;


  ngOnInit() {
    this.setQuetionsValue();
    this.initQuestions();
  }

  initQuestions() {
    this.questionCurrent = this.questions[0];
    this.progressTotal = this.questions.length;
  }

  onlyOne(alternative: Alternative, question: Question, event) {
      if (event && event.srcElement.checked == false && this.response[String(question.number)])
        delete this.response[String(question.number)];
      else {
        let checkboxes = Array.from(document.getElementsByName('check-alternative'));
        checkboxes.forEach((item) => {
          if (item['value'] != alternative.description) item['checked'] = false;
        });
        this.response[String(question.number)] = alternative;
      }
      this.progressValue = Object.keys(this.response).length;
      if (this.progressValue == this.questions.length)
        this.buttonSend = true
      else this.buttonSend = false
  }

  reset() {
    this.questionCurrent = this.questions[0];
    this.response = {};
    this.animalCurrent = undefined;
    this.buttonPreviousDisabled = true;
    this.buttonNextDisabled = false;
    this.progressValue = 0;
    this.buttonSend = false;
  }

  nextQuestion() {
    let index = this.questions.indexOf(this.questionCurrent);
    if (this.questions.length > (index + 1) && this.response[String(this.questionCurrent.number)]) {
      this.buttonPreviousDisabled = false;
      this.questionCurrent = this.questions[index + 1];
    }
    if (this.response[String(this.questionCurrent.number)])
      setTimeout(() => {
        let checkboxes = Array.from(document.getElementsByName('check-alternative'));
        checkboxes.forEach((item) => {
          if (item['value'] == this.response[String(this.questionCurrent.number)].description)
            item['checked'] = true;
        });
      }, 10);
    if (this.questions.length == (this.questions.indexOf(this.questionCurrent) + 1))
      this.buttonNextDisabled = true;
  }

  previousQuestion() {
    this.buttonNextDisabled = false;
    let index = this.questions.indexOf(this.questionCurrent);
    if (index != 0) {
      this.questionCurrent = this.questions[index - 1];
      if ((index - 1) == 0)
        this.buttonPreviousDisabled = true;
      setTimeout(() => {
        let checkboxes = Array.from(document.getElementsByName('check-alternative'));
        checkboxes.forEach((item) => {
          if (item['value'] == this.response[String(this.questionCurrent.number)].description)
            item['checked'] = true;
        });
      }, 10)
    }
  }

  finish() {
    let countObj = {};
    Object.keys(this.response).forEach(key => {
      if (!countObj[this.response[key].animal])
        countObj[this.response[key].animal] = 0;
      countObj[this.response[key].animal] += 1;
    });

    let sortable = [];
    for (var vehicle in countObj) {
        sortable.push([vehicle, countObj[vehicle]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    this.showAnimal(sortable[0][0]);
  }

  showAnimal(animal: string) {
    this.animalCurrent = this.animals.find(ani => ani.name == animal);
  }

  setQuetionsValue() {
    this.animals = [
      {
        name: "Tigre",
        url: 'https://s2.glbimg.com/RFnG4EgIzgmpejlSjWA8K3apZ5M=/e.glbimg.com/og/ed/f/original/2016/04/15/tiger-02.jpg',
        description: "Os Tigres costumam ser pessoas fogosas e humanitárias, que amam a vida, mas a sua personalidade forte gera, frequentemente, conflitos, pois os Tigres são muito competitivos - arrogantes, por vezes - e necessitam de aprovação constante. Não suportam ser ignorados.",
      },
      {
        name: "Panda",
        url: 'https://s4.static.brasilescola.uol.com.br/img/2019/09/panda.jpg',
        description: "Você gosta de brincar e tem bastante energia. Você é uma gracinha e sempre movimenta as festas que você vai. As pessoas gostam da sua atitude e sempre querem estar perto de você.",
      },
      {
        name: "Leão",
        url: 'https://static.todamateria.com.br/upload/le/ao/leaojuba-cke.jpg',
        description: "Você é líder e uma pessoa que os outros admiram. Raramente segue os outros e gosta de definir seu próprio caminho. Você é da realeza e se porta com um prestígio invejável.",
      },
      {
        name: "Coruja",
        url: 'https://cultura.jundiai.sp.gov.br/wp-content/uploads/2021/03/WhatsApp-Image-2021-03-01-at-20.05.51.jpeg',
        description: "Você é inteligente e sabe muito para a sua idade. Sua inteligência é vasta e a sensatez acompanha sua genialidade. Acima de tudo, você tem uma perspectiva que sempre permite que você tenha uma visão mais ampla.",
      },
      {
        name: "Tubarão",
        url: 'https://static.todamateria.com.br/upload/tu/ba/tubaraobranco-cke.jpg',
        description: "Você é inteligente e sabe muito para a sua idade. Sua inteligência é vasta e a sensatez acompanha sua genialidade. Acima de tudo, você tem uma perspectiva que sempre permite que você tenha uma visão mais ampla.",
      }
    ];

    this.questions = [
      {
        description: "Imagine que você está com amigos em um restaurante e um deles decide não pagar a conta, o que você faz?",
        number: 1,
        alternatives: [
          {
            description: "a) Você fica revoltado e toma a frente da situação, explicando para o seu amigo que isso é injusto com os demais. Se recusa a pagar a parte dele, incentivando os outros a se posicionar contra o pagamento.",
            animal: "Tigre"
          },
          {
            description: "b) Com tranquilidade tenta resolver a situação. Caso o amigo se recuse a pagar a conta resolve não criar polêmicas e aceita, porém, vai pensar duas vezes antes de sair com esse amigo de novo.",
            animal: "Leão"
          },
          {
            description: "c) Você fica profundamente magoado com o seu amigo. Resolve não criar polêmicas, paga a conta mas fica muito chateado.",
            animal: "Panda"
          },
          {
            description: "d)  Tenta apaziguar a situação e conversa com o amigo para ver o que aconteceu, se ele está atravessando uma situação financeira difícil. Caso você goste muito do amigo oferece dinheiro para ele pagar a conta.",
            animal: "Coruja"
          },
          {
            description: "e) Você fica irritado com a situação, argumenta com o amigo que aquilo é um absurdo. Pode até vir a pagar a conta mas com certeza vai riscar essa pessoa da suas amizades pois não é honesta.",
            animal: "Tubarão"
          }
        ]
      },
      {
        description: "Você:",
        number: 2,
        alternatives: [
          {
            description: "a) Defende o que acredita, mesmo quando tentam te intimidar.",
            animal: "Coruja"
          },
          {
            description: "b) Tem um grande poder de concentração.",
            animal: "Leão"
          },
          {
            description: "c) É criativo e sensível.",
            animal: "Panda"
          },
          {
            description: "d) Faz amigos com facilidade.",
            animal: "Tigre"
          },
          {
            description: "e) Com você missão dada e missão cumprida - sempre termina (e bem!) o que se propõe a fazer.",
            animal: "Tubarão"
          }
        ]
      },
      {
        description: "Imagine que seu colega de trabalho está discutindo com você e acaba te chamando de idiota, o que você faz?",
        number: 3,
        alternatives: [
          {
            description: "a) Fica irritado e responde com agressividade. Caso o colega se desculpe deixa pra lá.",
            animal: "Panda"
          },
          {
            description: "b) Não dá a mínima, acha que o colega já perdeu a razão.",
            animal: "Tigre"
          },
          {
            description: "c) Fica constrangido, magoado e não responde. Para que aumentar a discussão?.",
            animal: "Tubarão"
          },
          {
            description: "d) Retruca alguma coisa mas não dá muita importância, passa o tempo e você nem lembra mais.",
            animal: "Coruja"
          },
          {
            description: "e) Fica furioso e revida. Mesmo que o colega se desculpe fica magoado.",
            animal: "Leão"
          }
        ]
      },
      {
        description: "As pessoas te acham:",
        number: 4,
        alternatives: [
          {
            description: "a) Competente e diligente.",
            animal: "Tubarão"
          },
          {
            description: "b) Calmo e tranquilo.",
            animal: "Leão"
          },
          {
            description: "c) Bem intencionado e transparente.",
            animal: "Coruja"
          },
          {
            description: "d) Bem humorado e divertido.",
            animal: "Panda"
          },
          {
            description: "e) Misterioso e comprometido.",
            animal: "Tigre"
          }
        ]
      },
      {
        description: "Voce é aquele que:",
        number: 5,
        alternatives: [
          {
            description: "a) Toma a frente das situações.",
            animal: "Coruja"
          },
          {
            description: "b) Dificilmente perde a paciência.",
            animal: "Leão"
          },
          {
            description: "c) Tem muita empatia com os demais.",
            animal: "Panda"
          },
          {
            description: "d) Sabe contar uma boa historia.",
            animal: "Tigre"
          },
          {
            description: "e) Tem foco e disciplina.",
            animal: "Tubarão"
          }
        ]
      },
      {
        description: "O que você não faz de jeito nenhum?",
        number: 6,
        alternatives: [
          {
            description: "a) Me calar com o que não concordo.",
            animal: "Panda"
          },
          {
            description: "b) Gritar e perder totalmente o controle.",
            animal: "Tigre"
          },
          {
            description: "c) Bulling ou brincadeiras de mau gosto.",
            animal: "Leão"
          },
          {
            description: "d) Acabar com amizades por pequenas ofensas.",
            animal: "Tubarão"
          },
          {
            description: "e) Me submeter a situações que não concordo.",
            animal: "Coruja"
          }
        ]
      },
      {
        description: "Nenhuma das opções abaixo é boa mas o que te incomoda mais:",
        number: 7,
        alternatives: [
          {
            description: "a) Ser ignorado.",
            animal: "Leão"
          },
          {
            description: "b) Ser interrompido.",
            animal: "Tubarão"
          },
          {
            description: "c) Rirem de você.",
            animal: "Coruja"
          },
          {
            description: "d) Ser excluído.",
            animal: "Tigre"
          },
          {
            description: "e) Ser julgado.",
            animal: "Panda"
          }
        ]
      },
      {
        description: "Como é a sua rotina",
        number: 8,
        alternatives: [
          {
            description: "a) Sei exatamente o que fazer o dia inteiro e sou rígido.",
            animal: "Tubarão"
          },
          {
            description: "b) Faço apenas o que me comprometi com outras pessoas, sozinho perco a motivação.",
            animal: "Coruja"
          },
          {
            description: "c) Tenho dificuldade em manter rotinas. Se me empolgo com algo passo horas fazendo com muita energia mas, se me deprimo, não faço mais nada.",
            animal: "Tigre"
          },
          {
            description: "d) Mantenho a minha rotina mas não sou rígido.",
            animal: "Panda"
          },
          {
            description: "e) Se estou fazendo um trabalho sou constante e não paro até terminar. Se não tenho novas tarefas, fico perdido.",
            animal: "Leão"
          }
        ]
      },
      {
        description: "Ao cozinhar você",
        number: 9,
        alternatives: [
          {
            description: "a) Sigo a receita rigidamente.",
            animal: "Coruja"
          },
          {
            description: "b) Fico um pouco inseguro, nunca sei se a receita vai sair igual.",
            animal: "Leão"
          },
          {
            description: "c) Gosto de entender a receita mas criar minhas próprias versões. Se preciso seguir a receita a risca posso ficar entediado.",
            animal: "Tubarão"
          },
          {
            description: "d) Sigo a receita mas vou dando o meu toque e improvisando.",
            animal: "Tigre"
          },
          {
            description: "e) Se preciso, não tenho dificuldades de seguir os passos da receita.",
            animal: "Panda"
          }
        ]
      },
      {
        description: "Ninguém é perfeito e, às vezes, às pessoas reclamam que você é:",
        number: 10,
        alternatives: [
          {
            description: "a) Teimoso.",
            animal: "Panda"
          },
          {
            description: "b) Procrastinador.",
            animal: "Leão"
          },
          {
            description: "c) Vive em altos e baixos.",
            animal: "Tubarão"
          },
          {
            description: "d) Mandão.",
            animal: "Coruja"
          },
          {
            description: "e) Esquecido.",
            animal: "Tigre"
          }
        ]
      },
      {
        description: "Mas, também é:",
        number: 11,
        alternatives: [
          {
            description: "a) Organizado, prático e estável emocionalmente.",
            animal: "Panda"
          },
          {
            description: "b) Analista, cuidadoso e sensível.",
            animal: "Tubarão"
          },
          {
            description: "c) Intuitivo, sensível e criativo.",
            animal: "Tigre"
          },
          {
            description: "d) Cheio de energia, prático e decidido.",
            animal: "Leão"
          },
          {
            description: "e) Estável emocionalmente, compreensivo e racional.",
            animal: "Coruja"
          }
        ]
      },
      {
        description: "O que você faz se chega em uma festa e não encontra nenhum conhecido?",
        number: 12,
        alternatives: [
          {
            description: "a) Sou extrovertido, converso com quem estiver por perto e faço amigos.",
            animal: "Tubarão"
          },
          {
            description: "b)  Procuro uma pessoa conhecida.",
            animal: "Tigre"
          },
          {
            description: "c)  Depende: se eu estiver de bom humor puxo assunto com alguém ou procuro um conhecido, senão, fico na minha.",
            animal: "Panda"
          },
          {
            description: "d)  Espero algum conhecido vir falar comigo.",
            animal: "Coruja"
          },
          {
            description: "e) Vou embora",
            animal: "Leão"
          }
        ]
      },
      {
        description: "Quando tem um objetivo, você:",
        number: 13,
        alternatives: [
          {
            description: "a) Sou um pouco indisciplinado, nada de esquentar a cabeça.",
            animal: "Coruja"
          },
          {
            description: "b)  Sou determinado, disciplinado e eficiente.",
            animal: "Leão"
          },
          {
            description: "c) Extremamente perfeccionista e persistente.",
            animal: "Tigre"
          },
          {
            description: "d)  Faço as coisas no meu tempo, sem estresse.",
            animal: "Tubarão"
          },
          {
            description: "e) Apenas sonho sem correr atrás.",
            animal: "Panda"
          }
        ]
      },
      {
        description: "Em uma discussão você:",
        number: 14,
        alternatives: [
          {
            description: "a) Sou impulsivo, falo antes de pensar.",
            animal: "Leão"
          },
          {
            description: "b)  Argumento muito bem mas sou um pouco agressivo.",
            animal: "Tigre"
          },
          {
            description: "c)  Sou analítico e cauteloso nos meus argumentos.",
            animal: "Panda"
          },
          {
            description: "d)  Evito discussões mas, se não tiver remédio, sou apaziguador.",
            animal: "Tubarão"
          },
          {
            description: "e) Agressivo, expondo minhas ideias sem medo",
            animal: "Coruja"
          }
        ]
      },
      {
        description: "Nas suas relações você é:",
        number: 15,
        alternatives: [
          {
            description: "a) Caloroso e amigável.",
            animal: "Panda"
          },
          {
            description: "b)  Dominante, gosto de estar no controle.",
            animal: "Coruja"
          },
          {
            description: "c)  Sensível, levo muito em consideração o sentimento alheio.",
            animal: "Tubarão"
          },
          {
            description: "d)  Um pouco frio mas de fácil convivência.",
            animal: "Leão"
          },
          {
            description: "e) Retraído e submisso",
            animal: "Tigre"
          }
        ]
      },
      {
        description: "Qual defeito tem mais a ver com você?",
        number: 16,
        alternatives: [
          {
            description: "a) Desorganizado.",
            animal: "Leão"
          },
          {
            description: "b) Agressivo.",
            animal: "Panda"
          },
          {
            description: "c) Inseguro.",
            animal: "Tigre"
          },
          {
            description: "d) Desmotivado.",
            animal: "Tubarão"
          },
          {
            description: "e) Reclamão",
            animal: "Coruja"
          }
        ]
      },
      {
        description: "Você…",
        number: 17,
        alternatives: [
          {
            description: "a) Consegue identificar facilmente o humor das pessoas.",
            animal: "Coruja"
          },
          {
            description: "b) Raramente chora.",
            animal: "Tigre"
          },
          {
            description: "c) Gosta de assuntos ligados a arte (música, dança ou desenhos).",
            animal: "Tubarão"
          },
          {
            description: "d) Dificilmente se irrita.",
            animal: "Leão"
          },
          {
            description: "e) Gosta de esportes (Futebol, Skate, Natação, etc..)",
            animal: "Panda"
          }
        ]
      },
      {
        description: "Nas amizades, você…",
        number: 18,
        alternatives: [
          {
            description: "a) Tem muitos amigos.",
            animal: "Leão"
          },
          {
            description: "b) É dominante: seus amigos te classificam como mandão.",
            animal: "Tubarão"
          },
          {
            description: "c) É um amigo fiel mas tem dificuldade em fazer amizades.",
            animal: "Tigre"
          },
          {
            description: "d) Não tem muitos amigos, mas é bastante tranquilo quanto a isso.",
            animal: "Coruja"
          },
          {
            description: "e) Poucos amigos próximos, mas crio conexão fácil.",
            animal: "Panda"
          }
        ]
      },
      {
        description: "Você é bom em:",
        number: 19,
        alternatives: [
          {
            description: "a) Contar histórias: consigo prender a atenção das pessoas.",
            animal: "Tigre"
          },
          {
            description: "b) Debates: não vacilo sob a pressão dos outros.",
            animal: "Leão"
          },
          {
            description: "c) Sou ótimo para analisar situações e tomar decisões.",
            animal: "Panda"
          },
          {
            description: "d) Diplomata: sempre consigo manter a paz na relação com as pessoas.",
            animal: "Coruja"
          },
          {
            description: "e) Causar o caos e discórdia.",
            animal: "Tubarão"
          }
        ]
      },
      {
        description: "20) Os desafios:",
        number: 20,
        alternatives: [
          {
            description: "a) Te movem.",
            animal: "Panda"
          },
          {
            description: "b) Te preocupam.",
            animal: "Coruja"
          },
          {
            description: "c) Te empolgam.",
            animal: "Tubarão"
          },
          {
            description: "d) Não te abalam.",
            animal: "Leão"
          },
          {
            description: "e) Te desmotivam.",
            animal: "Tigre"
          }
        ]
      }
    ]
  }
}
