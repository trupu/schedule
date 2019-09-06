const merge = () => {
    const rows = document.querySelectorAll('tr');
    const rowsArray = Array.from(rows);

    let counter;
    let colIndex;
    let colValue;
    let pivot;

    rowsArray.forEach( el => {
        console.log(el);
        colIndex = [];
        colValue = [];
        counter = 2;
        pivot = 0;
        for (let i = 0; i < el.children.length; i++) {
            if (el.children[i+1]) {
                if (el.children[i].innerHTML === el.children[i+1].innerHTML) {
                    if (!colIndex[pivot]) {
                        colIndex[pivot] = i;
                        colValue[pivot] = counter;
                        counter++;
                        pivot++;
                    } else {
                        colValue[pivot]++;
                    }
                }
            } else {
                colIndex.forEach((sub, index) => {
                    for (let j = 0; j < (colValue[index]-1); j++) {
                        
                    }
                    el.children[sub].setAttribute('colspan', colValue[index]);
                });
            }
        }
    });

}

export default merge;