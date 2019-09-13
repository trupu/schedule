import fileLoader from './fileLoader';

// Parsing Returned XML String to the DOM Object
const changeXmlToDom = async () => {
    const xml = await fileLoader('plan.xml');
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");

    return doc;
}

export default changeXmlToDom;
