const LAYERS = document.querySelectorAll('.layer');
const MEDIA_PATH = '../web/files/media/';
const COLORS = ['magenta', 'green', 'blue', 'yellow', 'lightgreen'];

import { zalgo_text } from './zalgo.js';

const random = (len) => Math.floor(Math.random() * len);

function running_title(text) {
    const title = document.querySelector("title");
    let position = text.length;

    setInterval(() => {
        title.textContent = text.slice(position) + text.slice(0, position);
        position = (position - 1 + text.length) % text.length;
    }, 250);
}

async function fetchData() {
    const response = await fetch('/data');
    const data = await response.json();
    displayContent(data);
}

function displayContent(data) {
    data.media.forEach(() => addContent(data));
}

function addContent(data) {
    const layer = LAYERS[random(LAYERS.length)];
    if (!layer) {
        console.error("Layer not found");
        return;
    }

    addText(layer, data.text);
    addTextZalgo(layer, data.text);
    addMedia(layer, data.media);
}

function addMedia(layer, media) {
    const img = document.createElement('img');
    img.src = `${MEDIA_PATH}${media[random(media.length)]}`;

    const anim_random = generateRandomAnimation();

    const timing = {
        duration: 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
    }

    if (random(2)) {
        img.animate(anim_random, timing);
    }

    layer.appendChild(img);
}

function generateRandomAnimation() {
    const I = () => Math.random() * 1.5;
    return [
        { transform: `matrix(${I()}, ${I()}, ${I()}, ${I()}, ${I()}, ${I()})` },
        { transform: `matrix(${I()}, ${I()}, ${I()}, ${I()}, ${I()}, ${I()})` },
    ];
}

function addText(layer, phrases, isZalgo = false) {
    let text = phrases[random(phrases.length)];
    if (isZalgo) {
        text = zalgo_text(text);
    }
    const node = document.createTextNode(text);
    const span = document.createElement('span');
    span.style.color = COLORS[random(COLORS.length)];
    span.appendChild(node);
    layer.appendChild(span);
}

function addTextZalgo(layer, phrases) {
    addText(layer, phrases, true);
}

running_title("?!?!hgzr!?!?");
window.onload = fetchData;





