import Selector from '../selector/selector';
import contentLoader from '../table/tableContent';
import librus from '../../data/librusData';

// Implementing event('click') handler for header menu

const headerEvent = (xmlDOM) => {
    let name;
    const active = document.querySelector('.header_option-active');
    if (active) active.classList.remove('header_option-active');

    if (event.target instanceof HTMLElement) {
        const ev = event.target.closest('.header_option');
        ev.classList.add('header_option-active');
        name = ev.attributes['data-name'].value;
    } else {
        const ev = document.querySelector('.header_option');
        ev.classList.add('header_option-active');
        name = document.querySelector('.header_option').attributes['data-name'].value;
    }
    const list = document.querySelector('.hidden-scroll');
    const main = xmlDOM.querySelector(librus[name]);
    const mainArray = Array.from(main.children);

    const lis = document.querySelectorAll('.list-item');
    lis.forEach(el => el.remove());

    mainArray.forEach(el => {
        let li = document.createElement('li');
        li.innerHTML = el.attributes['name'].value;
        li.setAttribute('data-id', el.attributes['id'].value);
        li.classList.add('list-item');
        li.addEventListener('click', function() {
            selectorEvent(xmlDOM, name, li.innerHTML);
            Selector.hideSelector();
        });
        list.appendChild(li);
    });
}
// Event listener for every single list item in selector
const selectorEvent = (xmlDOM, parent, fullname) => {
    const title = document.querySelector('.schedule-title');
    title.innerHTML = fullname;
    const id = event.target.attributes['data-id'].value;

    // Unfortunatelly librus` attributes are named hopelessly, so we have to do such an weirdlooking if instruction :(
    if (parent === 'classes') {
        contentLoader(xmlDOM, 'classids', id);
    } else if (parent === 'teachers') {
        contentLoader(xmlDOM, 'teacherids', id);
    } else if (parent === 'classrooms') {
        contentLoader(xmlDOM, 'classroomsids', id);
    } else if (parent === 'subjects') {
        contentLoader(xmlDOM, 'subjectid', id)
    } else {
        console.log(`Błąd nazwy: ${parent}`);
    }
}

export default {headerEvent, selectorEvent};
