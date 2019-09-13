import librus from '../../data/librusData';
import Schedule from '../../data/lessonsObject';
import tableMerging from './tableMerging';
import colors from '../../data/classColors';

// Creating a schedule object containing all target`s lessons
const contentLoader = (xmlDOM, classid, id) => {

        const obj = xmlDOM.querySelector(librus.lessons);
        const lessonsArray = Array.from(obj.children);

        let lessons = [];

        lessonsArray.forEach(el => {
            if (el.attributes[classid].value === id) lessons.push(el);
        });

        let myCards = [];

        lessons.forEach(lesson => {
            let cards = xmlDOM.querySelector(librus.cards);
            let cardsArray = Array.from(cards.children);
            
            cardsArray.forEach(card => {
                if (card.attributes[librus.lessonid].value === lesson.attributes['id'].value) myCards.push(card);
            });
        });

        myCards.forEach(card => {
            let period = card.attributes['period'].value;
            let classroom = card.attributes[librus.classroomid].value;
            let day = card.attributes['days'].value;
            let lesson = card.attributes[librus.lessonid].value;

            Schedule.pushData(xmlDOM, day, period, classroom, lesson);
        });

        const schedule = Schedule.getData();

        beforeInserting(schedule, classid);

        Schedule.clearData();
}
// Middleware function - preparing data to be inserted into table cell
const beforeInserting = (schedule, classid) => {

    const rows = document.querySelectorAll('.schedule-gen');
    const rowsArray = Array.from(rows);

    let rowCounter = 0;
    schedule.forEach((day, index) => {
        let tds = Array.from(rowsArray[rowCounter].children);
        let cellIndex = 0;

        day.forEach(lesson => {
            let correct = tds.find(td => td.attributes['data-period'].value === lesson.period);
            cellIndex = tds.indexOf(correct);
            let content = correct.querySelector('.flexbox-center');

            let counter = lesson.lesson.numberOfLessons;

            let groupname = librus.groupname.find(el => el === lesson.lesson.group.attributes['name'].value);

            if (groupname || content.innerHTML !== '') {
                let newTds = Array.from(rowsArray[rowCounter+1].children);
                let newCorrect = newTds.find(td => td.attributes['data-period'].value === lesson.period);
                cellIndex = newTds.indexOf(newCorrect);
                let content = newCorrect.querySelector('.flexbox-center');
                validateTarget(classid, newTds[(cellIndex)], lesson);
            } else {
                validateTarget(classid, tds[(cellIndex)], lesson);
            }
        });
        rowCounter = rowCounter + 2;
    });
    // row merging
    tableMerging.mergeRows();
    // column merging
    tableMerging.mergeColumns();
};
// checking target`s type
const validateTarget = (classid, cell, data) => {
    let subject = {};
    let classObj = {};
    let classroom = {};
    let teacher = {};
    let group = '';
    let color = '';

    if (data.lesson.subject) {
        subject.short = data.lesson.subject.attributes['short'].value;
        subject.name = data.lesson.subject.attributes['name'].value;
    }
    if (data.lesson.classObj) {
        classObj.short = data.lesson.classObj.attributes['short'].value; 
        classObj.name = data.lesson.classObj.attributes['name'].value;
    }
    if (data.lesson.group) {
        group = data.lesson.group.attributes['name'].value;
    }
    if (data.classroom) {
        classroom.short = data.classroom.attributes['short'].value;
        classroom.name = data.classroom.attributes['name'].value;
    }
    if (data.lesson.teacher) {
        teacher.short = data.lesson.teacher.attributes['short'].value;
        teacher.name = data.lesson.teacher.attributes['name'].value;  
    }
    
    if (data.lesson.classIndex) {
        if (colors[data.lesson.classIndex]) {
            color = colors[data.lesson.classIndex];
        }
    }

    if (data.lesson.teacherIndex) {
        teacher.color = colors[data.lesson.teacherIndex];
    }

    if (classid === librus.classid) {
        insertContentIntoCell(cell, subject, classroom, teacher, group, teacher.color);
    } else if (classid === librus.teacherid) {
        insertContentIntoCell(cell, classObj, subject, classroom, '', color);
    } else if (classid === librus.classroomid) {
        insertContentIntoCell(cell, subject, classObj, teacher, '', color);
    } else if (classid === librus.subjectid) {
        insertContentIntoCell(cell, classObj, classroom, teacher, group, color);
    } else {
        console.log(`Nieprawidłowy format: '${classid}'!`);
    }

}
// inserting content into single cell
const insertContentIntoCell = (cell, center, bottomLeft, bottomRight, top, color) => {
    // cell`s background
    if (color) {
        let cw = cell.querySelector('.flexbox-wrapper');
        cw.style.backgroundColor = color;
        cw.style.color = '000';
    } else {
        let cw = cell.querySelector('.flexbox-wrapper');
        let last = colors.length;
        cw.style.backgroundColor = colors[(last-1)];
        cw.style.color = '000';
    }

    // flexbox-center
    if (center) {
        const contentCenter = cell.querySelector('.flexbox-center');
        contentCenter.innerHTML = center.short;
        contentCenter.setAttribute('title', center.name);
    }

    // flexbox-bottom
    const contentBottom = cell.querySelector('.flexbox-bottom');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    if (bottomLeft) {
        let left = document.createElement('span');
        left.innerHTML = bottomLeft.short;
        left.setAttribute('title', bottomLeft.name);
        wrapper.appendChild(left);
    }
    if (bottomRight) {
        let right = document.createElement('span');
        right.innerHTML = bottomRight.short;
        right.setAttribute('title', bottomRight.name);
        wrapper.appendChild(right);
    }
    contentBottom.appendChild(wrapper);
    
    // flexbox-top
    if (top) {
        const contentTop = cell.querySelector('.flexbox-top');
        if (top !== 'Cała klasa') {
            contentTop.innerHTML = top;
            contentTop.setAttribute('title', top);
        }
    }
}

export default contentLoader;
