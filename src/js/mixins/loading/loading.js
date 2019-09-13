const loader = () => {
    const selector = document.querySelector('.preloading');
    selector.style.animation = 'hideAnim .5s 1s ease-in-out both';
}

export default loader;