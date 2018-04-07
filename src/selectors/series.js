// Get visible series
const getVisibleSeries = (series, { text, sortBy }) => {
    return series.filter((show) => {
        const textMatch = show.name.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
        switch(sortBy){
            case 'name_ascending':
                return a.name > b.name;
            case 'name_descending':
                return a.name < b.name;
            case 'date_ascending':
                return a.createdAt > b.createdAt; // ? 1 : -1
            case 'date_descending':
                return a.createdAt < b.createdAt;
            case 'rating_ascending':
                return a.vote_avg > b.vote_avg;
            case 'rating_descending':
                return a.vote_avg < b.vote_avg;
        }
    });
};

export default getVisibleSeries;