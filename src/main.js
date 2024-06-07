'use strict';
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const timer = document.querySelector('.gameInfo__time');
const targetCount = document.querySelector('.gameInfo__targetCount');
const target = document.querySelector('.target');
const bug = document.querySelector('.bug');

// 시작
play.addEventListener('click',(e) => {
    play.classList.remove('statusOpen');
    pause.classList.add('statusOpen');

    let time = 20;
    let intervalId = null;
    timer.innerText = `${time}`;
    intervalId = setInterval(() => {
        time = time - 0.01;
        if (time <= 0) {
                alert('시간초과!');
                clearInterval(intervalId);
                return;
        } else {
            if(!pause.classList.contains('statusOpen')){
                alert('정지!');
                clearInterval(intervalId);
                return;
            }
            const seconds = time;
            const decimal = Math.floor((time%1)*10);
            //const decimal2 = Math.floor((time*100)%10);
            timer.innerText = `${seconds < 10 ? '0' : ''}${Math.floor(seconds)}:${decimal}`;
        }
    }, 10);
})

// 정지
pause.addEventListener('click',(e) => {
    play.classList.add('statusOpen');
    pause.classList.remove('statusOpen');
})


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