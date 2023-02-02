const keySound = {
    'w': document.querySelector('#boom'),
    's': document.querySelector('#clap'),
    'a': document.querySelector('#hithat'),
    'd': document.querySelector('#kick')
}
const result = document.querySelector('#result');
const record = document.querySelectorAll(".record");
const play = document.querySelectorAll(".play");

const ch1 = [];
const ch2 = [];
const ch3 = [];
const ch4 = [];

const channels = {
    '1': ch1,
    '2': ch2,
    '3': ch3,
    '4': ch4
}

const startRecord = r => {
    const regKey = () => {
        if (event.key === 'r') document.removeEventListener('keypress', regKey);
        else {
            channels[r].push({
                    'time': Date.now(),
                    'key': event.key
                }
            )
        }
    }
    document.addEventListener('keypress', regKey);
}

const newRecord = r => {
    const index = r.id.slice(-1);
    channels[index] = [];
    startRecord(index);
}

const playByLetter = letter => {
    keySound[letter].play();
}

const startPlay = p => {
    const ch = channels[p.id.slice(-1)];
    let time = 0;
    for (let i = 0; i < ch.length; i++) {
        if (i > 0) {
            time += ch[i].time - ch[i - 1].time;
        }
        setTimeout(() => {
            playByLetter(ch[i].key)
        }, time)
    }
}

document.addEventListener('keypress', () => playByLetter(event.key));

for (let i = 0; i < record.length; i++) {
    record[i].addEventListener('click', () => newRecord(record[i]))
}

for (let i = 0; i < play.length; i++) {
    play[i].addEventListener('click', () => startPlay(play[i]))
}
