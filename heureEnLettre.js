function convertirEnLettres(nombre) {
    const chiffresEnLettres = ['', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
    const dizainesEnLettres = ['', '', 'vingt ', 'trente ', 'quarante ', 'cinquante ']

    let uniteEnLettres =(nombre <= 9) ? chiffresEnLettres[nombre % 10] : chiffresEnLettres[nombre] 
    let dizaineEnLettres = ''

    if (nombre >= 20) {
        uniteEnLettres = (nombre % 10 === 1) ? 'et une' : chiffresEnLettres[nombre % 10]
        dizaineEnLettres = dizainesEnLettres[Math.floor(nombre / 10)]
    }

    return `${dizaineEnLettres}${uniteEnLettres}`.trim()
}

const ss = document.getElementById('secondes')
const mm = document.getElementById('minutes')
const hh = document.getElementById('heures')

function handleSecondes(sec) {    
    const secondesEnLettres = convertirEnLettres(sec)
    if (secondesEnLettres === '') {
        ss.innerText = ''
    } else if (secondesEnLettres ==='une')  {
        ss.innerText =secondesEnLettres +' seconde'
    } else {
        ss.innerText = secondesEnLettres +' secondes'
    }
}

function handleMinutes(min) {
    const casSpeciaux = {
        0: '',
        15: ' et quart',
        30: ' et demi',
        45: ' moins le quart'
    }

    let liaison = ''
    let minutesEnLettres = ''
    
    if (casSpeciaux[min] !== undefined) {
        minutesEnLettres = casSpeciaux[min]
    } else {
        if (min > 30) {
            min = 60 - min
            liaison = ' moins '
        }
        minutesEnLettres = convertirEnLettres(min)
    }
    
    if (minutesEnLettres === '') {
        mm.innerText=''
    } else if (minutesEnLettres === 'une') {
        if (liaison !== '') {
            mm.innerText = liaison + minutesEnLettres + ' minute'
        } else {
            mm.innerText = minutesEnLettres + ' minute'
        }
    } else if (liaison !== '') {
        mm.innerText = liaison + minutesEnLettres + ' minutes'
    } else if (minutesEnLettres === ' et demi' || minutesEnLettres === ' et quart' || minutesEnLettres === ' moins le quart') {
        mm.innerText= minutesEnLettres
    } else {
        mm.innerText = minutesEnLettres + ' minutes'
    }
}

function handleHeures(hr) {
    let heuresEnLettres=''
    switch (true) {
        case hr === 0:
            heuresEnLettres = 'minuit'
            break
        case hr === 12:
            heuresEnLettres = 'midi'
            break
        default:
            heuresEnLettres= convertirEnLettres(hr) 
    }

    if (heuresEnLettres === 'midi' || heuresEnLettres === 'minuit') {
        hh.innerText= heuresEnLettres
    } else if (heuresEnLettres === 'une') {
        hh.innerText= heuresEnLettres + ' heure'
    } else {
        hh.innerText= heuresEnLettres + ' heures'
    }
}

setInterval(() => {    
    const sec = new Date().getSeconds()
    const min = new Date().getMinutes()
    let hr = new Date().getHours()

    document.title = hr + ':' + min + ':' + sec

    if (min > 30) {
       hr++
    }

    if (hr === 24) {
        hr = 0
    }

    handleSecondes(sec)
    handleMinutes(min)
    handleHeures(hr)
    
}, 1000)

