import moment from 'moment';

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
            case 'date_added_oldest_first':
                return moment(a.createdAt).format("YYYY-MM-DD hh:mm:ss") > moment(b.createdAt).format("YYYY-MM-DD hh:mm:ss"); // ? 1 : -1
            case 'date_added_newest_first':
                return moment(a.createdAt).format("YYYY-MM-DD hh:mm:ss") < moment(b.createdAt).format("YYYY-MM-DD hh:mm:ss");
            case 'rating_ascending':
                return a.vote_avg > b.vote_avg;
            case 'rating_descending':
                return a.vote_avg < b.vote_avg;
        }
    });
};

export default getVisibleSeries;