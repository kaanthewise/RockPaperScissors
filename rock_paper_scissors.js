document.body.addEventListener('keydown', (event) => {
    if (event.key === 't' || event.key === '1') {
        sistem('Rock');
    }
    else if (event.key === 'k' || event.key === '2') {
        sistem('Paper');
    }
    else if (event.key === 'm' || event.key === '3') {
        sistem('Scissors');
    }
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        if (document.querySelector('.js-reset').innerHTML !== '') {
            hideResetConfirmation();
            skor.kazan = 0;
            skor.yenil = 0;
            skor.berabere = 0;
            localStorage.removeItem('skor');
            updateSkor();
    } else {
        showReset(); // Eğer onay ekranı yoksa, onay göster
    }
    }
    if (event.key === 'a'){
        autoPlay();
    }
});

function showReset(){
    document.querySelector('.js-reset').innerHTML = `
        Are you sure you want to reset the score?
        <button class="yes-js">Yes</button> 
        <button class="no-js">No</button>
    `

    document.querySelector('.yes-js').addEventListener('click', () => {
        hideResetConfirmation();
        skor.kazan = 0;
        skor.yenil = 0;
        skor.berabere = 0;
        localStorage.removeItem('skor');
        updateSkor();

    
});
    document.querySelector('.no-js').addEventListener('click', () => {  
        hideResetConfirmation();
    });
};
function hideResetConfirmation() {
    document.querySelector('.js-reset')
        .innerHTML = '';
}



//onclick kullanmak yerine addEventListener ile daha efektif kullanabiliriz
document.querySelector('.js-tas').addEventListener('click', () => {
    sistem('Rock');
} )
document.querySelector('.js-kagit').addEventListener('click', () => {
    sistem('Paper');
} )
document.querySelector('.js-makas').addEventListener('click', () => {
    sistem('Scissors');
} )
document.querySelector('.auto-js').addEventListener('click', () => {
    autoPlay();
} )
document.querySelector('.zero-js').addEventListener('click', () => {
    showReset();
} )


let skor = JSON.parse(localStorage.getItem('skor')) || { 
    kazan : 0,
    yenil : 0,
    berabere : 0
} 

updateSkor();
let intervalID; 
let isim = document.querySelector('.auto-js');


let IsAutoPlaying = false;
/*const autoPlay = () => { //arrow function

}*/

function autoPlay(){
    if(!IsAutoPlaying){
        intervalID = setInterval(() =>{ //arrow function
        const tercih2 = pcTercihi();
        sistem(tercih2);
        },1000);
        IsAutoPlaying = true;
        isim.textContent = 'Stop Play';
    }
    else{
        clearInterval(intervalID);
        IsAutoPlaying = false;
        isim.textContent = 'Auto Play';
    }

}

function sistem(tercih){
    const pcSec = pcTercihi();
    let result = ' ';

    if(tercih == 'Rock'){
        if(pcSec == 'Rock'){
            result = 'Tie';
        } else if(pcSec == 'Paper'){
            result = 'Defeat';
        } else if(pcSec == 'Scissors'){
            result = 'Win';
        }
    }
    if (tercih == 'Paper'){
        if(pcSec == 'Rock'){
            result = 'Win';
        } else if(pcSec == 'Paper'){
            result = 'Tie';
        } else if(pcSec == 'Scissors'){
            result = 'Defeat';
        }
    }
    if (tercih == 'Scissors'){
        if(pcSec == 'Rock'){
            result = 'Defeat';
        } else if(pcSec == 'Paper'){
            result = 'Win';
        } else if(pcSec == 'Scissors'){
            result = 'Tie';
        }
    }

    if (result === 'Win'){
        skor.kazan++;
    }
    if (result === 'Tie'){
        skor.berabere++;
    }
    if (result === 'Defeat'){
        skor.yenil++;
    }

    localStorage.setItem('skor', JSON.stringify(skor));

    updateSkor();
    
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML =  `Your choice
    <img src="images/${tercih}-emoji.png" class="hareket">  - 
    Computers choice <img src="images/${pcSec}-emoji.png" class="hareket">`;

    
    //`Senin tercihin ${tercih} - Bilgisayarın tercihi ${pcSec}`
    //alert(`Senin tercihin ${tercih}, Bilgisayarın tercihi ise ${pcSec} . ${result},Galibiyet = ${skor.kazan}, Yenilgi= ${skor.yenil}, Beraberlik= ${skor.berabere}`);
}

function updateSkor() {
    document.querySelector('.js-score')
    .innerHTML = ` Wins = ${skor.kazan}, Defeats= ${skor.yenil}, Ties= ${skor.berabere}`;

}

function pcTercihi(){
    let pcSec = '';
    const randomSayi = Math.random();

    if (randomSayi >= 0 && randomSayi <= 1/3){
        pcSec = 'Rock';
    } else if (randomSayi > 1/3 && randomSayi < 2/3){
        pcSec = 'Paper';
    } else if (randomSayi > 2/3 && randomSayi < 1){
        pcSec = 'Scissors';
    }
    return pcSec;
}