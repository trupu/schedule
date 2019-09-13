const checkValues = (x, y, full) => {
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

            let check = checkValues(x, y, true);
            let secondCheck = checkValues(s, t);

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

export default { mergeRows };