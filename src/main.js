'use strict';
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.gameInfo__time');
const targetCount = document.querySelector('.gameInfo__targetCount');
const menu = document.querySelector('.gameMenu');
const restartBtn = document.querySelector('.gameMenu__restart');
const result = document.querySelector('.gameMenu__result');

const field = document.querySelector('.gameField');
const target = document.querySelector('.target');
const target2 = document.querySelector('.target2');
const bug = document.querySelector('.bug');
let fieldWidth = field.offsetWidth;
let fieldHeight = field.offsetHeight;
let targetWidth = target.offsetWidth;
let targetHeight = target.offsetHeight;
let target2Width = target2.offsetWidth;
let target2Height = target2.offsetHeight;
let bugWidth = bug.offsetWidth;
let bugHeight = bug.offsetHeight;
field.innerHTML = '';

const maxTime = 10;
let time = maxTime;
let intervalId = null;
let gameOn = true;
menu.style.display = 'none';
let isMenuActive = false;


// 시작
play.addEventListener('click',startGame);
function startGame() {
    toggleStatus(true);
    toggleMenu(false);
    if(gameOn){
        inGame();
    }
    intervalId = setInterval(() => {
        time = time - 0.1;
        if (time < 0) {
            overTime();
        } else {
            const seconds = time;
            const decimal = Math.floor((time%1)*10);
            //const decimal2 = Math.floor((time*100)%10);
            timer.innerText = `${Math.floor(seconds)}.${decimal}`;
        }
    }, 100);
}

// 정지
pause.addEventListener('click',(e) => {
    if (intervalId) {
        clearTimer()
        toggleStatus(false);
        toggleMenu(true);
        result.innerText = '다시시작';
    }
})

// clickTarget
function clickTarget(e){
    if(isMenuActive) return;
    e.target.parentNode.removeChild(e.target); // 자기 자신 삭제 못함. 그래서 parentNode
    const countTarget = document.querySelectorAll('.target').length; // 현재 타겟의 수
    const countTarget2 = document.querySelectorAll('.target2').length; // 현재 타겟의 수
    if (countTarget === 0 && countTarget2 === 0) { // 클릭된 타겟의 수와 현재 타겟의 수가 같으면
        clear(); // clear 함수 호출
    }
}

// clear
function clear(){
    fail();
    result.innerText = '게임 클리어!';
    return;
}

// bug 클릭
function gameOver(){
    if(isMenuActive) return;
    fail();
    result.innerText = '실패!!';
    return;
}

// 시간초과
function overTime(){
    fail();
    result.innerText = '시간이 초과되었습니다!';
    return;
}


// 실패
function fail() {
    clearTimer()
    toggleStatus(false);
    toggleMenu(true);
    play.style.visibility = 'hidden';
}

// 재시작
restartBtn.addEventListener('click', resetGame);
function resetGame() {
    intervalId = null;
    time = maxTime;
    timer.innerText = `${maxTime}.0`;
    play.style.visibility = 'visible';
    field.innerHTML = '';
    gameOn = true;
    toggleStatus(false);
    toggleMenu(false);
}

// 시작,정지버튼
function toggleStatus(shouldShow) {
    play.style.display = shouldShow ? 'none' : 'block';
    pause.style.display = shouldShow ? 'block' : 'none';
}

// 하단메뉴
function toggleMenu(shouldShow) {
    // menu.style.visibility = shouldShow ? 'visible' : 'hidden';
    if (menu.style.display === 'flex' && !shouldShow) {
        menu.style.display = 'none';
        isMenuActive = false;
    } else if (menu.style.display !== 'flex' && shouldShow) {
        menu.style.display = 'flex';
        isMenuActive = true;
    }
}

// 타이머 정지
function clearTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

// 게임필드
function inGame() {
    gameOn = false;
    // console.log(fieldWidth,fieldHeight);
    // console.log(targetWidth,targetHeight);
    // console.log(bugWidth,bugHeight);

    for(let i=0; i<5; i++){
        let cloneTarget = target.cloneNode(true);
        cloneTarget.style.top = Math.random() * (fieldHeight - targetHeight) + 'px';
        cloneTarget.style.left = Math.random() * (fieldWidth - targetWidth) + 'px';
        cloneTarget.addEventListener('click',(e) => { clickTarget(e); });
        field.appendChild(cloneTarget);

        let cloneTarget2 = target2.cloneNode(true);
        cloneTarget2.style.top = Math.random() * (fieldHeight - target2Height) + 'px';
        cloneTarget2.style.left = Math.random() * (fieldWidth - target2Width) + 'px';
        cloneTarget2.addEventListener('click',(e) => { clickTarget(e); });
        console.log(target2Height);
        console.log(cloneTarget2.style.top);
        field.appendChild(cloneTarget2);
    }
    for(let i=0; i<10; i++){
        let cloneBug = bug.cloneNode(true);
        cloneBug.style.top = Math.random() * (fieldHeight - bugHeight) + 'px';
        cloneBug.style.left = Math.random() * (fieldWidth - bugWidth) + 'px';
        cloneBug.addEventListener('click',gameOver);
        field.appendChild(cloneBug);
    }
}

// 1. 게임 스타트
// 실행버튼을 누르면 bug와 target을 랜덤위치에 정해진 갯수만큼 생성
// 타이머가 시작됨
// target 클릭시 target이 줄어듬
// bug 클릭시 실패로

// 2. 일시정지/재시작/실행
// 실행버튼 클릭시 실행이 정지버튼이 됨
// 타이머가 시작됨
// 정지버튼 클릭시 정지버튼이 실행버튼이 됨
// 타이머가 멈춤
// 하단메뉴가 나옴
//     다시하기 버튼을 누르면 게임이 리셋됨
//     "계속 도전해보세요!" 문구가 나옴

// 3. 성공
// 클리어시 타이머가 멈춤
// 실행버튼이 사라짐
// 하단메뉴가 나옴
//     다시하기 버튼을 누르면 게임이 리셋됨
//     "클리어!" 문구가 나옴

// 4. 실패
// 시간초과시 타이머가 멈춤
// 하단메뉴가 나옴
//     실행버튼이 사라짐
//     다시하기 버튼을 누르면 게임이 리셋됨
//     "시간초과!" 문구가 나옴

// bug클릭시 타이머가 멈춤
// 하단메뉴가 나옴
//     실행버튼이 사라짐
//     다시하기 버튼을 누르면 게임이 리셋됨
//     "게임오버!" 문구가 나옴

// 5. 다시하기
// 다시하기 클릭시
// 타이머 0
// target 0
// 실행버튼 상태
