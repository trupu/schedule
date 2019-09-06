import '../css/app.scss';
import fileTransformation from './mixins/file/fileTransformation';
import Selector from './mixins/selector/selector';
import tableGenerator from './mixins/table/tableGenerator';
import tableMerging from './mixins/table/tableMerging';
import eventHandler from './mixins/header/eventHandler';

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

const app = async () => {
    const xmlDOM = await fileTransformation();
    tableGenerator(xmlDOM);
    // tableMerging();
    eventHandler.headerEvent(xmlDOM);

    const header = document.querySelectorAll('.header_option');
        header.forEach(el => {
            el.addEventListener('click', function() {
                eventHandler.headerEvent(xmlDOM);
            });
        });
}

app();