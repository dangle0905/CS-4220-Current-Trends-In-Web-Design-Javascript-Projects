// in-memory data storage
// this will only persist data for as long as the server in running
const collection = {
    entries: []
};

const all = () => {
    return collection.entries;
};

const get = (id) => {
    const snippet = collection.entries.filter((entry) => entry.id === id);

    if (snippet) {
        return snippet;
    }

    throw new Error(`No snippits exists for ${id}.`);
};

const add = (data) => {
    const id = collection.entries.length + 1;
    const snippet = { ...data, id };

    collection.entries.push(snippet);

    return snippet;
};

module.exports = {
    all,
    get,
    add
};
