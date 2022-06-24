// in-memory data storage
// this will only persist data for as long as the server in running
const collection = {
    entries: []
};

const all = () => {
    return collection.entries;
};

const get = (id) => {
    const snippet = collection.entries.find((entry) => entry.id === id);

    return snippet;
};

const add = (data) => {
    const id = collection.entries.length + 1;
    const snippet = { ...data, id };

    collection.entries.push(snippet);

    return snippet;
};

const update = (id, data) => {
    const index = collection.entries.findIndex((entry) => entry.id === id);

    if (index !== -1) {
        const old = collection.entries[index];
        const snippet = { ...old, ...data };

        collection.entries[index] = snippet;

        return snippet;
    }

    return { error: `No snippets exists for ${id}.` };
};

module.exports = {
    all,
    get,
    add,
    update
};
