window.addEventListener('load', shuffleAll);
let allLevelDivs = document.querySelectorAll('[class*="level"]'); //selektuj sve elemente koji u sebi sadrze rijec level
let twoSlices = [];
let currentView = 'level-1';
const conffeti = document.querySelector('.confetti');
const audio = new Audio('./music.mp3')

function shuffleAll(){
    console.log(allLevelDivs.length);
    for (const levelDiv of allLevelDivs) {
        let allSlices = levelDiv.querySelectorAll('[class*=img-holder]');
        let orderArr = [];
        for (let i = 0; i < allSlices.length; i++) {
            orderArr.push(i+1);
        }

        for (let i = 0; i < allSlices.length; i++) {
            let rand = Math.floor(Math.random()*orderArr.length);
            allSlices[i].style.order = orderArr[rand];
            orderArr.splice(rand,1);
        }
    }
    startGame();
}

function startGame(){
    //set links to show/hide
    setNavLinks();
    //set clicks on all slices
    addClicksToSlices();
}

function addClicksToSlices(){
    let allSlices = document.querySelectorAll('[class*="img-holder"]');
    for (const slice of allSlices) {
        slice.addEventListener('click', selectDiv);
    }
}

function selectDiv(){
    this.style.border = "2px solid green";
    twoSlices.push(this);
    if(twoSlices.length === 2){
        //get order of clicks
        let orderFirst = window.getComputedStyle(twoSlices[0]).getPropertyValue('order');
        let orderSecond = window.getComputedStyle(twoSlices[1]).getPropertyValue('order');
        console.log(orderFirst,orderSecond);
        //reorder
        twoSlices[0].style.order = orderSecond;
        twoSlices[1].style.order = orderFirst;

        //remove border
        twoSlices[0].style.border = "none";
        twoSlices[1].style.border = "none";

        //reset twoSlices for other clicks
        twoSlices.length = 0;
        checkIsComplete();
    }
}

function checkIsComplete(){
    let currentLvl = document.querySelector('.'+currentView);
    let allSlices = currentLvl.querySelectorAll('[class*="img-holder"]');

    let correctOrder = [];
    for (let i = 0; i < allSlices.length; i++) {
        correctOrder.push(i+1);
    }

    let currentOrder = [];
    for (let i = 0; i < allSlices.length; i++) {
        const slice = allSlices[i];
        currentOrder.push(window.getComputedStyle(slice).getPropertyValue('order'));
    }
    if(currentOrder.toString() == correctOrder.toString()) {
        audio.play();
        conffeti.classList.add('active');
        let activeLink = document.querySelector('.active');
        activeLink.classList.add('finished');
        currentLvl.style.border = "5px solid green";
        currentLvl.style.boxShadow = "0 0 16px green";
    }
}

function setNavLinks(){
    let headerNavLinks = document.querySelectorAll('[data-lvl]');

    for (let i = 0; i < headerNavLinks.length; i++) {
        const link = headerNavLinks[i];
        link.addEventListener('click', function (){
            currentView = this.getAttribute('data-lvl');
            for (const myLink of headerNavLinks) {
                myLink.classList.remove('active');
                conffeti.classList.remove('active');
                audio.pause();
            }
            this.classList.add('active');

            console.log(currentView.toString());
            //hide all levels
            for (let i = 0; i < allLevelDivs.length; i++) {
                allLevelDivs[i].style.display = "none";
            }
            let divToShow = document.querySelector('.' +currentView);
            divToShow.style.display = "flex";
        })
    }
}