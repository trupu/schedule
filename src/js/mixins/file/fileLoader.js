import address from '../../config/address';

// DOWNLOADING schedule.xml by sending POST type httprequest on backend API endpoint serving file
// you may want to serve file from the same endpoint as schedule API
// in this case all you have to do is change 'axios.post' to 'axios.get' :)

const loader = (filename) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = {};
            formData.filename = filename;
            const res = await axios.post(address, formData);
            const { data } = res.data;
            resolve(data);
        } catch(err) {
            reject(err);
        }
    });
};

export default loader;