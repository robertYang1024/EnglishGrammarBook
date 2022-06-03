class LocalStore {
    // constructor(id) {
    //     this.key = id !== undefined ? `highlight-mengshou-${id}` : 'highlight-mengshou';
    // }
    constructor() {
        const hash  = window.location.hash || '#README';
        const hashs = hash.split('#');
        this.key = `highlight-${hashs[1].replaceAll("/",'-')}`; 
    }

    updateKey() {
        const hashs = window.location.hash.split('#');
        this.key = `highlight-${hashs[1].replaceAll("/",'-')}`; 
    }

    storeToJson() {
        // const store = localStorage.getItem(this.key);
        return axios.get(`/api/english/notes?key=${this.key}`).then(res => {
            const result =  res.data;
            let sources = [];
            if (result.code === 200) {

                // try {
                //     sources = JSON.parse(store) || [];
                // }
                // catch (e) {
                //     sources = [];
                // }
                sources = result?.data?.data || [];
            }
            return sources;
        });
    }

    jsonToStore(stores) {
        // localStorage.setItem(this.key, JSON.stringify(stores));
        axios.post(`/api/english/save?key=${this.key}`, stores).then(res => {
            return res.data;
        })
    }

   async save(data) {
        const stores = await this.storeToJson();
        const map = {};
        stores.forEach((store, idx) => map[store.hs.id] = idx);

        if (!Array.isArray(data)) {
            data = [data];
        }

        data.forEach(store => {
            // update
            if (map[store.hs.id] !== undefined) {
                stores[map[store.hs.id]] = store;
            }
            // append
            else {
                stores.push(store);
            }
        })
        this.jsonToStore(stores);
    }

    async forceSave(store) {
        const stores = await this.storeToJson();
        stores.push(store);
        this.jsonToStore(stores);
    }

    async remove(id) {
        const stores = await this.storeToJson();
        let index = null;
        for (let i = 0; i < stores.length; i++) {
            if (stores[i].hs.id === id) {
                index = i;
                break;
            }
        }
        stores.splice(index, 1);
        this.jsonToStore(stores);
    }

    async getAll() {
        const ddd = await this.storeToJson();
        return ddd;
    }

    removeAll() {
        this.jsonToStore([]);
    }
}

// export default LocalStore;