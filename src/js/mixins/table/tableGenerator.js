import librus from '../../data/librusData';

// Generating blank table
// EVERY SINGLE COLUMN IS GENERATED TWICE TO AVOID FUTURE ISSUES WITH MERGING!!!

const generatingTable = (xmlDOM) => {

    const periods = xmlDOM.querySelector(librus.periods);
    const daysdefs = xmlDOM.querySelector(librus.daysdefs);

    const parent = document.querySelector('.table-wrapper');

    const table = document.createElement('table');
    for (let i = 0; i < (librus.days*2)+2; i++) {
        let tr = document.createElement('tr');
        tr.classList.add(`row${i+1}`);
        for (let j = 0; j < (periods.children.length+1); j++) {
            let td = document.createElement('td');
            td.classList.add(`column${j+1}`);
            td.setAttribute('data-x', j+1);
            td.setAttribute('data-y', i+1);
            let flex = document.createElement('div');
            flex.classList.add('flexbox-center');
            let flex1 = document.createElement('div');
            flex1.classList.add('flexbox-bottom');
            let flex2 = document.createElement('div');
            flex2.classList.add('flexbox-top');
            td.appendChild(flex);
            td.appendChild(flex1);
            td.appendChild(flex2);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    parent.appendChild(table);

    // ADDING PERIODS CONTENT TO THE TABLE (row1)

    const row1 = document.querySelector('.row1');

    for (let i = 1; i < row1.children.length; i++) {
        if (periods.children[i-1]) {
            // flexbox-center
            row1.children[i].children[0].innerHTML = periods.children[i-1].attributes['short'].value;
            // flexbox-bottom
            row1.children[i].children[1].innerHTML = `${periods.children[i-1].attributes['starttime'].value}-${periods.children[i-1].attributes['endtime'].value}`;
        }
    }

    // ADDING DAYSDEFS CONTENT TO THE TABLE (column1)

    const column1 = document.querySelectorAll('.column1');
    let pom = 2;
    for(let i = 0; i < daysdefs.children.length; i++) {
        if (daysdefs.children[i] && daysdefs.children[i].attributes['short'].value !== 'X' && daysdefs.children[i].attributes['short'].value !== 'E') {
            // flexbox-center
            column1[pom].children[0].innerHTML = daysdefs.children[i].attributes['short'].value;
            pom = pom + 2;
        }
    }
}

export default generatingTable;