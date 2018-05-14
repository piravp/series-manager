// Get filtered timeline events
const getVisibleCollections = (collections, selectedCollections) => {

    // Loop through every collection inside collections
    return collections.filter(collection => {

        // Return collection if name is same as the filtered list
        return selectedCollections.indexOf(collection) !== -1;
    });
};

export default getVisibleCollections;
