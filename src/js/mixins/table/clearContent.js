// generating flex-wrapper structure
const generateCellStructure = (parent) => {
    let main = document.createElement('div');
    main.classList.add('flexbox-wrapper');
    let flex = document.createElement('div');
    flex.classList.add('flexbox-center');
    let flex2 = document.createElement('div');
    flex2.classList.add('flexbox-bottom');
    let flex3 = document.createElement('div');
    flex3.classList.add('flexbox-top');
    main.appendChild(flex);
    main.appendChild(flex2);
    main.appendChild(flex3);
    parent.appendChild(main);
}

// clearing content of the table
const clearTableContent = () => {
    return new Promise((resolve, reject) => {
        try {
            const tds = document.querySelectorAll('.cell-gen');
            const tdsArray = Array.from(tds);
            tdsArray.forEach(td => {
                let parent = td.parentElement;
                let newTd = document.createElement('td');
                newTd.classList = td.classList;
                if (newTd.classList.contains('huge-cell')) newTd.classList.remove('huge-cell');
                newTd.setAttribute('data-period', td.attributes['data-period'].value);
                let wrapper = document.createElement('div');
                wrapper.classList.add('flexbox-wrapper');
                let center = document.createElement('div');
                center.classList.add('flexbox-center');
                let bottom = document.createElement('div');
                bottom.classList.add('flexbox-bottom');
                let top = document.createElement('div');
                top.classList.add('flexbox-top');
                wrapper.appendChild(center);
                wrapper.appendChild(bottom);
                wrapper.appendChild(top);
                newTd.appendChild(wrapper);
                parent.appendChild(newTd);
                td.remove();
            });
            const c1 = document.querySelectorAll('.column1');
            const column1 = Array.from(c1);
            column1.forEach(td => {
                if (td.innerHTML === '') td.remove();
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

export default {clearTableContent, generateCellStructure};