const cards = document.querySelectorAll('.card_item')
const game = document.querySelector('.game_container')
const end = document.querySelector('.end_body')
const image = document.querySelector('.end_image')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let final = 0;
let positionLeft = 5620 - document.documentElement.clientWidth

function moveImage() {
  const image = document.querySelector('.end_image')
  const imageSize = image.offsetWidth
  const position = imageSize - document.documentElement.clientWidth
  image.style.transition = 50 + 's'
  setTimeout(() => {
    image.style.transform = `translateX(${-position}px)`
  }, 1000)
}
function loadEnd() {
  game.classList.add('smooth_end')
  showFlapper()
  let fl1 = document.querySelector('.flapper1')
  let fl2 = document.querySelector('.flapper2')
setTimeout(() => {
    game.remove()
    end.classList.remove('none')
    end.classList.add('smooth_start')
    let endTitle = document.querySelector('.end_title') 
    let endInfo = document.querySelector('.end_info')
    setTimeout(() => {
      endTitle.classList.add('smooth_start')
    }, 1000)
    setTimeout(() => {
      endInfo.classList.add('smooth_start')
    }, 2000)
    moveImage()

  }, 1000)
  setTimeout(() => {
    fl1.classList.add('smooth_end')
    fl2.classList.add('smooth_end')
  }, 2000)
}

let secondCounter = 0;

function hintTimer() {
  let timer = setInterval(() => {
    if (secondCounter === 5) {
      showHint()
      setTimeout(() => clearInterval(timer))
    } else if (firstCard) {
      setTimeout(() => clearInterval(timer))
    }
     else {
      secondCounter++
    }
  }, 1000)
}
let atributes = [
  'garik',
  'azamat',
  'ildar',
  'nurlan'
] 
function showHint() {
  let index = atributes[0]
  let cards = document.querySelectorAll('.card_item')
  cards.forEach((item) => {
    if (!item.className.includes('view') && !item.className.includes('blow') && item.getAttribute('data-framework') === index) {
      item.classList.add('blow')
    }
    secondCounter = 0;
  })
  atributes.shift()
}

function flipCard() {
    secondCounter = 0
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return
    }
    else {
        secondCard = this;
        lockBoard = true;
    }
    checkForMatch();
}

function checkForMatch() {
    secondCounter = 0
    let isMatch = firstCard.getAttribute('data-framework') === secondCard.getAttribute('data-framework');
    isMatch ? disableCards() : unflipCards();
}

  function disableCards() {
    if (final !==3 ) {
      const maskLeft = document.createElement('div')
      const maskRight = document.createElement('div')
      maskLeft.classList.add('maskLeft')
      maskRight.classList.add('maskRight')
      document.body.appendChild(maskLeft)
      document.body.appendChild(maskRight)
    
      let leftX = maskLeft.getBoundingClientRect().left
      let leftY = maskLeft.getBoundingClientRect().y
      let rightX = maskRight.getBoundingClientRect().right
      let rightY = maskRight.getBoundingClientRect().y
  
      createConfettiLeft(leftX, leftY, 20)
      createConfettiRight(rightX, rightY, 20)
      final++
      maskLeft.remove()
      maskRight.remove()
      hintTimer()
    }
    else {
      loadEnd()

    }
    firstCard.classList.remove('blow')
    secondCard.classList.remove('blow')
    firstCard.classList.add('view')
    secondCard.classList.add('view')
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    secondCard = 0;
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
      hintTimer()
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


const showFlapper = () => {
  const flapper1 = document.createElement('div')
  const flapper2 = document.createElement('div')
  flapper1.classList.add('flapper1')
  flapper2.classList.add('flapper2')
  document.body.appendChild(flapper1)
  document.body.appendChild(flapper2)

  const getCor = () => {
    let leftX = flapper1.getBoundingClientRect().left
    let leftY = flapper1.getBoundingClientRect().y
    let rightX = flapper2.getBoundingClientRect().right
    let rightY = flapper2.getBoundingClientRect().y
    createConfettiLeft(leftX, leftY, 55)
    createConfettiRight(rightX, rightY, 55)

  }
  setTimeout(getCor, 500)
}
window.addEventListener('resize', resizeEndImage)

function resizeEndImage() {
  const endImage = document.querySelector('.end_image')
  endImage.style.transition = 0 + 's'
  const imageSize = endImage.offsetWidth
  const position = imageSize - document.documentElement.clientWidth
  endImage.style.transform = 'translateX(0px)'
  setTimeout(() => {
      endImage.style.transition = 50 + 's'
      endImage.style.transform = `translateX(${-position}px)`
  }, 100)
}


const randomId = function(length) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
  charactersLength)));
 }
 return result.join('');
}

const createConfettiLeft = function(x, y, confettiCount) {
    let confettiWrapper = document.createElement('div');
    confettiWrapper.classList.add('confettiWrapper');
    let makeId = randomId(10);
    confettiWrapper.setAttribute('data-id', makeId);
    let confettiItem = '';
    let pathes = [
      'url(./images/confetti/conf_item1.png)',
      'url(./images/confetti/conf_item2.png)',
      'url(./images/confetti/conf_item3.png)',
      'url(./images/confetti/conf_item4.png)',
    ]
    
    for(var i = 0; i < confettiCount; ++i) {
        let path = Math.floor(Math.random() * (pathes.length));
        confettiItem +=
        `
        <div
          class="conf_item"
          style="background: ${pathes[path]};
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;

          "
          data-angle="${Math.random()}"
          data-speed="${Math.random()}">
        </div>
        `;
    }
    confettiWrapper.style.position = `fixed`;
    confettiWrapper.style.top = `${y+100}px`;
    confettiWrapper.style.left = `${x}px`;
    confettiWrapper.innerHTML = confettiItem;


    document.body.appendChild(confettiWrapper);


    let gravity =  50; 
    let maxSpeed = 205000; 
    let minSpeed = 165000; 
    let t = 0;
    let maxAngle = 1500; 0
    let minAngle = 400; 
    let opacity = 1;
    let rotateAngle = 0;
  
    let interval = setInterval(function() {
        document.querySelectorAll(`[data-id="${makeId}"] .conf_item`).forEach(function(item) {
            let modifierX = 1;
            let modifierY = 1;
            if(item.classList.contains('reverse')) {
                modifierX = -1;
            }  
            item.style.opacity = opacity;
  
            let randomNumber = parseFloat(item.getAttribute('data-angle'));
            let otherRandom = parseFloat(item.getAttribute('data-speed'));
            let newRotateAngle = randomNumber * rotateAngle;
            let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
            let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
            let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
            let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
            item.style.transform = `translateX(${x * modifierX}px) translateY(${y * -1 * modifierY}px) rotateY(${newRotateAngle}deg) scale(${1})`;
        })
        t += 0.1;
        opacity -= 0.01;
        if(t >= 16) {
            t = 0.1;
            if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                document.querySelector(`[data-id="${makeId}"]`).remove();
            }
            clearInterval(interval);
        }
    },
    23.33);
  }


  const createConfettiRight = function(x, y, confettiCount) {
      let confettiWrapper = document.createElement('div');
      confettiWrapper.classList.add('confettiWrapper');
      let makeId = randomId(10);
      confettiWrapper.setAttribute('data-id', makeId);
      let confettiItem = '';
      let pathes = [
        'url(./images/confetti/conf_item1.png)',
        'url(./images/confetti/conf_item2.png)',
        'url(./images/confetti/conf_item3.png)',
        'url(./images/confetti/conf_item4.png)',
        ]
      
      for(var i = 0; i < confettiCount; ++i) {
          let path = Math.floor(Math.random() * (pathes.length));
          confettiItem +=
          `
          <div
            class="conf_item"
            style="background: ${pathes[path]};
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;

            "
            data-angle="${Math.random()}"
            data-speed="${Math.random()}">
          </div>
          `;
      }
      confettiWrapper.style.position = `fixed`;
      confettiWrapper.style.top = `${y+100}px`;
      confettiWrapper.style.left = `${x}px`;
      confettiWrapper.innerHTML = confettiItem;
      document.body.appendChild(confettiWrapper);
  
      let gravity =  50;
      let maxSpeed = 205000;0
      let minSpeed = 165000;
      let t = 0; 
      let maxAngle = 1500; 0
      let minAngle = 400; 
      let opacity = 1;
      let rotateAngle = 0;
    
      let interval = setInterval(function() {
          document.querySelectorAll(`[data-id="${makeId}"] .conf_item`).forEach(function(item) {
    
              let modifierX = -1;
              let modifierY = 1;
              if(item.classList.contains('reverse')) {
                  modifierX = -1;
              }  
              item.style.opacity = opacity;
    
    
              let randomNumber = parseFloat(item.getAttribute('data-angle'));
              let otherRandom = parseFloat(item.getAttribute('data-speed'));
    
              let newRotateAngle = randomNumber * rotateAngle;
    
    
              let angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
              let speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
              let x = speed * t * Math.cos(angle) + (50 * otherRandom * t);
              let y = speed * t * Math.sin(angle) - (0.5 * gravity * Math.pow(t, 2))  + (50 * otherRandom * t);
              item.style.transform = `translateX(${x * modifierX}px) translateY(${y * -1 * modifierY}px) rotateY(${newRotateAngle}deg) scale(${1})`;
          })
          t += 0.1;
          opacity -= 0.01;
          if(t >= 16) {
              t = 0.1;
              if(document.querySelector(`[data-id="${makeId}"]`) !== null) {
                  document.querySelector(`[data-id="${makeId}"]`).remove();
              }
              clearInterval(interval);
          }
      },
      23.33);
  }

  function randomCardPosition() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 8);
      card.style.order = ramdomPos;
    });
  };
  randomCardPosition()
cards.forEach(card => card.addEventListener('click', flipCard));