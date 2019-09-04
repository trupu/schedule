const showSelector = () => {
    const ev = event.target.closest('.cs-select');
    event.target.closest('.selector-title').innerHTML = '';
    ev.classList.add('cs-active');
}

export default showSelector;