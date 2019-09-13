// checking values for row merging
const checkValuesRow = (x, y, full) => {
    if (full) {
        if (x.innerHTML !== '' && y.innerHTML === '') {
            return true;
        }
        if (x.innerHTML === '' && y.innerHTML !== '') {
            return true;
        }
    }
    if (x.innerHTML === y.innerHTML) {
        return true;
    }
    return false;
}

// checking values for column merging
const checkValuesColumn = (x, y) => {
    let s = x.querySelector('.flexbox-center');
    let t = y.querySelector('.flexbox-center');
    // avoiding bugs with blank tds merging
    if (s.innerHTML !== '' && t.innerHTML !== '') {
        if (x.innerHTML === y.innerHTML) {
            return true;
        }
    }
    return false;
}

// merging rows
const mergeRows = () => {
    const rows = document.querySelectorAll('tr');
    const rowsArray = Array.from(rows);

    let counter;
    let colIndex;
    let colValue;
    let pivot;

    for (let i = 0; i < (rowsArray.length-1); i=i+2) {
        
        let rc = rowsArray[i].children;
        let rc2 = rowsArray[i+1].children;
        let array = Array.from(rc);
        let array2 = Array.from(rc2);

        array.forEach((td, index) => {
            let x = td.querySelector('.flexbox-center');
            let y = array2[index].querySelector('.flexbox-center');

            let s = td.querySelector('.flexbox-top');
            let t = array2[index].querySelector('.flexbox-top');

            let check = checkValuesRow(x, y, true);
            let secondCheck = checkValuesRow(s, t);

            if (check && secondCheck) {
                if (x.innerHTML === '') {
                    td.innerHTML = array2[index].innerHTML;
                    td.style.backgroundColor = array2[index].style.backgroundColor;
                    td.style.color = array2[index].style.color;
                    td.setAttribute('rowspan', 2);
                    array2[index].style.display = 'none';
                } else {
                    td.setAttribute('rowspan', 2);
                    array2[index].style.display = 'none';
                }
                td.classList.add('huge-cell');
            }
        });
    }

}
// merging columns
const mergeColumns = () => {
    const rows = document.querySelectorAll('.schedule-gen');
    const rowsArray = Array.from(rows);

    rowsArray.forEach(row => {
        let tds = row.children;
        let tdsArray = Array.from(tds);

        let spanIndex = [];
        let spanValue = [];
        let counter = 1;
        let pivot = -1;

        for (let i = 1; i < tdsArray.length; i++) {
            if (tdsArray[i].style.display !== 'none') {
                if (tdsArray[i+1] && tdsArray[i+1].style.display !== 'none') {
                    let x = tdsArray[i].querySelector('.flexbox-wrapper');
                    let y = tdsArray[i+1].querySelector('.flexbox-wrapper');
                    let compare = checkValuesColumn(x, y);

                    if (compare) {
                        if (!spanIndex[pivot]) {
                            spanIndex.push(i);
                            ++counter;
                            spanValue.push(counter);
                            pivot = spanIndex.indexOf(i);
                        } else {
                            ++counter;
                            spanValue[pivot] = counter;
                        }
                    } else {
                        pivot = -1;
                        counter = 1;
                    }
                } else {

                }
            }
        }
        spanIndex.forEach((td, index) => {
            tdsArray[td].setAttribute('colspan', spanValue[index]);
            for (let i = 1; i < (spanValue[index]); i++) {
                tdsArray[td+i].style.display = 'none';
            }
        });
    })

}

export default { mergeRows, mergeColumns };