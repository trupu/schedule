import '../css/app.scss';
import fileTransformation from './mixins/file/fileTransformation';
import Selector from './mixins/selector/selector';
import tableGenerator from './mixins/table/tableGenerator';
import eventHandler from './mixins/header/eventHandler';
import siteLoader from './mixins/loading/loading';

// showing/hiding Selector

const selector = document.querySelector('.cs-select');
const shadowBox = document.querySelector('.selector-shadow-box');

selector.addEventListener('click', Selector.showSelector);
shadowBox.addEventListener('click', Selector.hideSelector);

// adding event listener for 'esc' button to handle shadowBox(list overlay) hiding

window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        const active = document.querySelector('.cs-active');
        if (active) Selector.hideSelector();
    }
};

// whole APP

const app = async () => {
    const xmlDOM = await fileTransformation();          // downloading file: fileLoader.js
    tableGenerator(xmlDOM);                             // generating table: tableGenerator.js        
    eventHandler.headerEvent(xmlDOM);                   // calling header 'click': eventHandler.js

    siteLoader(); // site preload

    // handling header 'click': eventHandler.js

    const header = document.querySelectorAll('.header_option');
        header.forEach(el => {
            el.addEventListener('click', function() {
                eventHandler.headerEvent(xmlDOM);
                eventHandler.generateRandom(xmlDOM);
            });
        });
    if (header[0]) header[0].click(); // generating schedule for random instance of 1st 'header-option'
}

// calling app function :)
app();
