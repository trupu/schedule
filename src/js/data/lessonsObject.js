import librus from '../data/librusData';

const Schedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],

    // Preparing schedule by pushing data to correct day of week (array)
    pushData(xmlDOM, day, period, classroom, lesson) {

        const x = xmlDOM.querySelector(librus.classrooms);
        const y = Array.from(x.children);

        classroom = y.find(el => el.attributes['id'].value === classroom);

        const z = xmlDOM.querySelector(librus.lessons);
        const za = Array.from(z.children);

        lesson = za.find(el => el.attributes['id'].value === lesson);

        lesson = this.dataMiddleware(xmlDOM, lesson, librus.lessons);
        
        if (day === '10000') {
            this.Monday.push({lesson, classroom, period});
        } else if (day === '01000') {
            this.Tuesday.push({lesson, classroom, period});
        } else if (day === '00100') {
            this.Wednesday.push({lesson, classroom, period});
        } else if (day === '00010') {
            this.Thursday.push({lesson, classroom, period});
        } else if (day === '00001') {
            this.Friday.push({lesson, classroom, period});
        } else {
            console.log(`Nieprawidłowy format: ${day}`);
        }
    },

    // Pulling out needed data from DOM structure (subjects, teachers, groups)
    dataMiddleware(xmlDOM, data, librusName) {
        let x = xmlDOM.querySelector(librus.subjects);
        let arraySubject = Array.from(x.children);
        let y = xmlDOM.querySelector(librus.teachers);
        let arrayTeacher = Array.from(y.children);
        let z = xmlDOM.querySelector(librus.groups);
        let arrayGroup = Array.from(z.children);
        let s = xmlDOM.querySelector(librus.classes);
        let arrayClasses = Array.from(s.children);

        let numberOfLessons = data.attributes[librus.numberOfLessons].value;

        let classObj = arrayClasses.find(el => el.attributes['id'].value === data.attributes[librus.classid].value);
        let subject = arraySubject.find(el => el.attributes['id'].value === data.attributes[librus.subjectid].value);
        let teacher = arrayTeacher.find(el => el.attributes['id'].value === data.attributes[librus.teacherid].value);
        let group = arrayGroup.find(el => el.attributes['id'].value === data.attributes[librus.groupid].value);
        return {
            numberOfLessons,
            classObj,
            subject,
            teacher,
            group
        };
    },

    // easly pulling out data :)
    getData(day) {
        if (day) return this[day];
        // returning data in correct order
        return [this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday];
    },

    clearData() {
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
    }
}

export default Schedule;
