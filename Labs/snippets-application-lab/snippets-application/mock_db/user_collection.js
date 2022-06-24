// in-memory data storage
// this will only persist data for as long as the server in running
const collection = {
    entries: []
};

const get = (username) => {
    const user = collection.entries.find(
        (entry) => entry.username.toLowerCase() === username.toLowerCase()
    );

    return user;
};

const add = (data) => {
    const id = collection.entries.length + 1;
    const user = { ...data, id };

    collection.entries.push(user);

    return user;
};

module.exports = {
    get,
    add
};
