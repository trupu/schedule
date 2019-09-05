import '../css/app.scss';
import Selector from './mixins/selector/selector';
import table from './mixins/tableGenerator';

const selector = document.querySelector('.cs-select');
const shadowBox = document.querySelector('.selector-shadow-box');

selector.addEventListener('click', Selector.showSelector);
shadowBox.addEventListener('click', Selector.hideSelector);

window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        const active = document.querySelector('.cs-active');
        if (active) Selector.hideSelector();
    }
};


table();