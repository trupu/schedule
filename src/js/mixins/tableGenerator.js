import fileTransformation from './fileTransformation';
import librus from '../data/librusData';

// Generating blank table

const generatingTable = async () => {
    const xmlDOM = await fileTransformation();

    const periods = xmlDOM.querySelector(librus.periods);
    console.log(periods.children);

    const parent = document.querySelector('.table-wrapper');

    const table = document.createElement('table');
    for (let i = 0; i < (librus.days*2); i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < periods.children.length; j++) {
            let td = document.createElement('td');
            td.setAttribute('data-x', j+1);
            td.setAttribute('data-y', i+1);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    parent.appendChild(table);
}

export default generatingTable;