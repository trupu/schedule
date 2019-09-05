// Showing list with loaded contant fe. classes
const showSelector = () => {
    const ev = document.querySelector('.cs-select');
    ev.classList.add('cs-active');
    const shadowBox = document.querySelector('.selector-shadow-box');
    shadowBox.style.animation = 'showShadowBox .5s both ease-in-out';
    const title = document.querySelector('.selector-title');
    title.style.display = 'none';
}

// Hiding list with loaded content fe. classes
const hideSelector = () => {
    const ev = document.querySelector('.cs-active');
    ev.classList.remove('cs-active');
    const shadowBox = document.querySelector('.selector-shadow-box');
    shadowBox.style.animation = 'showShadowBox .5s both ease-in-out reverse';
    const title = document.querySelector('.selector-title');
    title.style.display = 'flex';
}

export default { showSelector, hideSelector };