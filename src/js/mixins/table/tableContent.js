import librus from '../../data/librusData';

// Loading lessons for given object
const contentLoader = (xmlDOM, parent, id) => {
    const tempLessons = xmlDOM.querySelector(librus.lessons);
    const tempLessonsArray = Array.from(tempLessons.children); 

    let lessons = [];

    tempLessonsArray.forEach(el => {
        if (el.attributes[parent].value === id) lessons.push(el);
    });
}

const generateTableContent = (center, bottomLeft, bottomRight, top, color) => {

}

export default contentLoader;
