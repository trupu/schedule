import address from '../../config/address';

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