const beginGame = document.querySelector('.begin');
const form = document.createElement('form');
const input = document.createElement('input');
input.placeholder = "Введите количество карт в ширину";
const button = document.createElement('button');
button.textContent = 'Начать игру!';
form.classList.add('input-group', 'mb-3');
input.classList.add('form-control');
button.classList.add('btn', 'btn-primary');
form.appendChild(input);
form.appendChild(button);
beginGame.appendChild(form);
let width = 20;
let array = [];
let value = 4;
let margin = 1;
let len = 8;
let timer;
let countGame = 0;
let checkGame = countGame;
let clickTrue = true;
const container = document.createElement('container');
container.classList.add('container');
//   function shuffle(array) {
    //     var copy = [], n = array.length, i;
      
    //     // While there remain elements to shuffle…
    //     while (n) {
      
    //       // Pick a remaining element…
    //       i = Math.floor(Math.random() * n--);
      
    //       // And move it to the new array.
    //       copy.push(array.splice(i, 1)[0]);
    //     }
      
    //     return copy;
    //   }


    // function shuffle(array) {
    //     var copy = [], n = array.length, i;
      
    //     // While there remain elements to shuffle…
    //     while (n) {
      
    //       // Pick a remaining element…
    //       i = Math.floor(Math.random() * array.length);
      
    //       // If not already shuffled, move it to the new array.
    //       if (i in array) {
    //         copy.push(array[i]);
    //         delete array[i];
    //         n--;
    //       }
    //     }
      
    //     return copy;
    //   }
function arrayMake(array, len) {
    array = []
    for (let i = 1; i <= len / 2; i++) {
        array.push(i);
        array.push(i);
    }
    function shuffle(array) {
        console.log("Я мешаю!!")
        array.sort(() => Math.random() - 0.5);
    };
    shuffle(array)
    console.log(array)
    return array
}
function creatArticle(array, len) {
    array = arrayMake(array, len);
    let listArticle = []
    for (let i in array) {
        let article = document.createElement('article');
        article.style=`width:${width}%; height: auto; overflow: hidden; margin: ${margin}%; border: 2px solid black; border-radius: 20px`;
        article.id = i;
        let img = document.createElement('img');
        img.src='img/273e0dcf9762.jpg'
        img.style="width:100%; position: relative;";
        let valueCard = document.createElement('p');
        valueCard.textContent = array[i];
        article.classList.add('card');
        img.classList.add('card-img');
        valueCard.classList.add('card-text-value');
        valueCard.style=`position: absolute; font-size:${value < 5 ? parseInt(article.style.width.slice(0, -1)) * 100: parseInt(article.style.width.slice(0, -1)) * 70}%;`
        article.appendChild(img);
        article.appendChild(valueCard);
        container.appendChild(article);
        listArticle.push(article);
    }
    gameBegin()
};
function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
function gameBegin() {
    clickTrue = true;
    let listArticle = document.querySelectorAll('.card');
    // timer = new Timer(gameContinue(listArticle), 10000);
    // // alert(timer.timeout);
    // console.log(`TIMER:  ${timer.id}, ${timer.timeout}`)
    timer = setTimeout(gameContinue, 10000, listArticle);
    let openArticle = [];
    let value;
    let listOPen = [];
    count = 0;
    listArticle.forEach(function(event, index) { 
        event.addEventListener('click', () => {
            let id = event.id
            // if (oldCount === count) {
            //     oldCount = count;
            //     console.log(`TIMER:::::::::  ${timer.timeout}`)
            //     articles.forEach(function(event) {
            //         event.removeEventListener('click', callback)
            //     });
            //  }
            if (!openArticle.includes(id)) {
                if (clickTrue === true) {
                    event.classList.add('card-active');
                    listOPen.push(event)
                    openArticle.push(id)
                    console.log(openArticle.length, listArticle.length, id);
                    if (count > 1) {
                        if (value === listOPen[listOPen.length - 3].children[1].textContent) {
                            console.log("МОЛОДЕЦ!!!!!!")
                            count = 0;
                        }
                        else { 
                            console.log("Хуй тебе!!!!!!")
                            for (let i = 2; i <= 3; i++) {
                                listOPen[listOPen.length - i].classList.remove('card-active')
                            }
                            count = 0;
                            }
                        }
                    value = event.children[1].textContent
                    count++; 
                if (openArticle.length === listArticle.length) {
                    console.log(`Game Over`)
                    if (checkGame === countGame) {
                        clearTimeout(timer)
                        }
                    // sleep(2000);
                    // setTimeout(gameContinue(listArticle), 20000)
                    gameContinue(listArticle)
                    }
                }
                // console.log(count, value) 
            }  
        });
    });
} 
function gameContinue(articles) {
    countGame++;
    clickTrue = false;
    p = document.createElement('P');
    p.textContent = 'GAME OVER!';
    container.appendChild(p);
    p.style = 'font-size: 134px; line-height: 1';
    let btnWrapper;
    if (!btnWrapper) {
        btnWrapper = document.createElement('div');
        btnWrapper.classList.add("btnWraper");
        container.appendChild(btnWrapper);
        let btn = document.createElement('button');
        btn.id="id";
        btn.classList.add('btn');
        btn.textContent = 'Сыграть еще раз';
        btnWrapper.appendChild(btn);
        btn.addEventListener('click', () => {
            checkGame = countGame;
            p.remove()
            gameReplay(btnWrapper, articles)
            btnWrapper.remove()
        })
    }
};
// let timer = setInterval(() => {
//     creatArticle(array);
// }, 5000);
// function gameOver() {
//     if (!timer) {
//         creatArticle(array, len)
//     }
//     else if (timer > 0) {
//         console.log("!!!!!!!!!!TIMER")
//         clearInterval(timer)
//         timer = setInterval(gameContinue, 10000)
//     }
// }
function gameReplay(btnWrapper, articles) {
    articles.forEach(function(event) {
        event.remove()
    });
    console.log('На  меня нажали!!!!');
    console.log(array, len)
    creatArticle(array, len)
}
form.addEventListener('submit', () => {
    value = (!(parseInt(input.value) % 2) && (parseInt(input.value) > 0)) ? parseInt(input.value) : 4;
    // value = value > 7 ? value + 1 : value
    // console.log(value, 100 / (value + value * .2))
    margin = 100 / (value * 100 - 1);
    console.log(100 / Math.round(value + value * margin))
    width = value ? (100 / Math.round(value + value * margin)) : 30;
    len = Math.pow(value, 2)
    console.log(value, len, width)
    console.log(value)
    form.remove();
    beginGame.appendChild(container);
    creatArticle(array, len);
})

// function Timer(callback, timeout) {
//     this.callback = callback;
//     this.timeout = timeout;
//     this.id = window.setTimeout(callback, timeout);
//   }
  
//   Timer.prototype.cancel = function() {
//     window.clearTimeout(this.id);
//   }
  
//   Timer.prototype.fire = function() {
//     this.cancel();
//     this.callback();
//   }