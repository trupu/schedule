import Selector from '../selector/selector';
import librus from '../../data/librusData';
import clearContent from '../table/clearContent';
import contentLoader from '../table/tableContent';

// Implementing event('click') handler for header menu

const headerEvent = (xmlDOM) => {
    let name, dataName, dataContent;
    const active = document.querySelector('.header_option-active');
    if (active) active.classList.remove('header_option-active');

    if (event.target instanceof HTMLElement) {
        const ev = event.target.closest('.header_option');
        ev.classList.add('header_option-active');
        name = ev.attributes['data-name'].value;
        dataName = ev.querySelector('.selector-data-name').innerHTML;
        dataContent = ev.attributes['data-title'].value;
    } else {
        const ev = document.querySelector('.header_option');
        ev.classList.add('header_option-active');
        name = document.querySelector('.header_option').attributes['data-name'].value;
        dataName = ev.querySelector('.selector-data-name').innerHTML;
        dataContent = ev.attributes['data-title'].value;
    }

    const selectLabel = document.querySelector('.select-label');
    selectLabel.innerHTML = dataContent;
    const selectorTitle = document.querySelector('.selector-title_content');
    selectorTitle.innerHTML = dataName;

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
            let id = event.target.attributes['data-id'].value;
            setTimeout(async () => {
                await clearContent.clearTableContent();
                selectorEvent(xmlDOM, name, li.innerHTML, id);
                Selector.hideSelector();
            }, 10);
        });
        list.appendChild(li);
    });
}
// Event listener for every single list item in selector
const selectorEvent = (xmlDOM, parent, fullname, id) => {
    const title = document.querySelector('.schedule-title');
    title.innerHTML = fullname;

    // Unfortunatelly librus` attributes are hopelessly named, so we have to do such an weirdlooking if instruction :(
    if (parent === librus.classes) {
        contentLoader(xmlDOM, librus.classid, id);
    } else if (parent === librus.teachers) {
        contentLoader(xmlDOM, librus.teacherid, id);
    } else if (parent === librus.classrooms) {
        contentLoader(xmlDOM, librus.classroomid, id);
    } else if (parent === librus.subjects) {
        contentLoader(xmlDOM, librus.subjectid, id);
    } else {
        console.log(`Błąd nazwy: ${parent}`);
    }
}

export default {headerEvent, selectorEvent};
