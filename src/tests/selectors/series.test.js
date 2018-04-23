import getVisibleSeries from '../../selectors/series';

const series = [{
    id: 1411,
    name: "Person of Interest",
    backdrop_path: "/wJ1D6uvKmc5sqqdYfyNmWMMxS22.jpg",
    description: "Some text",
    vote_avg: 7.67,
    first_aired: "2011-09-22",
    createdAt: '2018-03-22 17:49:03',
    poster_path: "https://image.tmdb.org/t/p/w300//7XFZOcYiBuFDrhqGrEoawF0T30l.jpg",
}, {
    id: 32,
    name: "Homeland",
    backdrop_path: "/wsd6uvKmc5sqsdsamWMMxS22.jpg",
    description: "Some text",
    vote_avg: 8.2,
    first_aired: "2011-08-19",
    createdAt: '2018-01-20 19:43:20',
    poster_path: "https://image.tmdb.org/t/p/w300//7XFZxcvrDrhqGrEoawF0T30l.jpg",
}];

test('Should filter by text value', () => {
    const filters = {
        text: 'o',
        "sortBy": 'name_ascending'
    };
    
    const result = getVisibleSeries(series, filters);
    expect(result).toEqual([series[1], series[0]])
});