import '../css/app.scss';
import showSelector from './mixins/selector/selector';
import table from './mixins/tableGenerator';

const selector = document.querySelector('.cs-select');

selector.addEventListener('click', showSelector);

table();