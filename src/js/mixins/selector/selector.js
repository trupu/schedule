// Showing list with loaded contant fe. classes
const showSelector = () => {
    const ev = document.querySelector('.cs-select');
    if (ev.classList.contains('cs-active')) return;
    ev.classList.add('cs-active');
    const shadowBox = document.querySelector('.selector-shadow-box');
    shadowBox.style.animation = 'showShadowBox .5s both ease-in-out';
    const title = document.querySelector('.selector-title');
    title.style.display = 'none';
    // removing event listener since this function will be called by cs-select`s children
    ev.removeEventListener('click', showSelector);
}

// Hiding list with loaded content fe. classes
const hideSelector = () => {
    const ev = document.querySelector('.cs-active');
    if (ev) ev.classList.remove('cs-active');
    const shadowBox = document.querySelector('.selector-shadow-box');
    shadowBox.style.animation = 'showShadowBox .5s both ease-in-out reverse';
    const title = document.querySelector('.selector-title');
    title.style.display = 'flex';
    // Timeout 10ms since this function will be called by cs-select`s children
    setTimeout(() => {
        ev.addEventListener('click', showSelector);
    }, 10);
}

export default { showSelector, hideSelector };