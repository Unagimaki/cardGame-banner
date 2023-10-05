let intro = document.querySelector('.intro_container')
let gameContainer = document.querySelector('.game_container')
let gameBtn = document.querySelector('.intro_button')
let modalBtn = document.querySelector('.modal_button')
let modal = document.querySelector('.modal_container')

function render() {
    intro.classList.add('smooth_end')
    setTimeout(() => {
        intro.remove()
        gameContainer.classList.remove('none')
        gameContainer.classList.add('smooth_start')
        modal.classList.remove('none')
        modal.classList.add('flex')
        modal.classList.add('smooth_start')
        window.addEventListener(('click'), (e) => {
            if (e.target.className.includes('modal_container')) closeModal()
        })
    }, 500)
}

function closeModal() {
    modal.classList.add('smooth_end')
    hintTimer()
    setTimeout(() => {
        modal.remove()
    }, 500)
}

gameBtn.addEventListener('click', render)

modalBtn.addEventListener('click', closeModal)
