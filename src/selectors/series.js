// Get visible series
const getVisibleSeries = (series, { text, sortBy }) => {
    return series.filter((show) => {
        const textMatch = show.name.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            // Synkende rekkefølge (nyest først)
            console.log(a.createdAt < b.createdAt)
            return a.createdAt < b.createdAt ? 1 : -1
        } 
        else if (sortBy === 'name'){
            // Stigende rekkefølge
            //console.log(a.name > b.name)
            //return a.name.localeCompare(b.name);
            return a.name > b.name;
        }
    });
};

export default getVisibleSeries;