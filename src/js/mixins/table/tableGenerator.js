import librus from '../../data/librusData';

// Generating blank table
// EVERY SINGLE COLUMN IS GENERATED TWICE TO AVOID FUTURE ISSUES WITH MERGING!!!

const generatingTable = (xmlDOM) => {
    const periods = xmlDOM.querySelector(librus.periods);
    const daysdefs = xmlDOM.querySelector(librus.daysdefs);

    const parent = document.querySelector('.table-wrapper');

    const table = document.createElement('table');
    table.classList.add('main-table');
    for (let i = 0; i < (librus.days*2)+2; i++) {
        let tr = document.createElement('tr');
        tr.classList.add(`row${i+1}`);
        if (i > 1) {
            tr.classList.add('schedule-gen');
        }
        for (let j = 0; j < (periods.children.length+1); j++) {
            let td = document.createElement('td');
            td.classList.add(`column${j+1}`);
                if (j >= 0 && i > 1) {
                    td.setAttribute('data-period', j);
                }
                if (j > 0 && i > 1) {
                    td.classList.add('cell-gen');
                }
            td.setAttribute('data-x', j+1);
            td.setAttribute('data-y', i+1);
            let flex = document.createElement('div');
            flex.classList.add('flexbox-wrapper');
            let flexChild = document.createElement('div');
            flexChild.classList.add('flexbox-center');
            let flexChild2 = document.createElement('div');
            flexChild2.classList.add('flexbox-bottom');
            let flexChild3 = document.createElement('div');
            flexChild3.classList.add('flexbox-top');
            flex.appendChild(flexChild);
            flex.appendChild(flexChild2);
            flex.appendChild(flexChild3);
            td.appendChild(flex);
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
            let d1 = row1.children[i].firstChild.children[0];
            d1.innerHTML = periods.children[i-1].attributes['short'].value;
            // flexbox-bottom
            let d2 = row1.children[i].firstChild.children[1];
            d2.innerHTML = `${periods.children[i-1].attributes['starttime'].value}-${periods.children[i-1].attributes['endtime'].value}`;
        }
    }

    // ADDING DAYSDEFS CONTENT TO THE TABLE (column1)

    const column1 = document.querySelectorAll('.column1');
    let pom = 2;
    for(let i = 0; i < daysdefs.children.length; i++) {
        if (daysdefs.children[i] && daysdefs.children[i].attributes['short'].value !== 'X' && daysdefs.children[i].attributes['short'].value !== 'E') {
            // flexbox-center
            column1[pom].firstChild.firstChild.innerHTML = daysdefs.children[i].attributes['short'].value;
            column1[pom].firstChild.setAttribute('title', daysdefs.children[i].attributes['name'].value);
            pom = pom + 2;
        }
    }
}

export default generatingTable;