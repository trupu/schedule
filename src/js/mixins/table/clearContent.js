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
            const divs = document.querySelectorAll('.cell-gen');
            const divsArray = Array.from(divs);
            divsArray.forEach(el => {
                let wrapper = el.querySelector('.flexbox-wrapper');

                if (wrapper && wrapper.children) {
                    let array = Array.from(wrapper.children);
                    array.map(flex => flex.innerHTML = '');
                }
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

export default {clearTableContent, generateCellStructure};