
const events = [
    {
        month: 'July',
        day: '17',
        pays: 'USA',
        state: 'Dana Point',
        place: 'Doheny State Beach',
        status: 'Aborted',
        link: '#'
    },
    {
        month: 'July',
        day: '24',
        pays: 'Canada',
        state: 'Toronto',
        place: 'Scotiabank Arena',
        status: 'Aborted',
        link: '#'
    },
    {
        month: 'July',
        day: '25',
        pays: 'Canada',
        state: 'Ottawa',
        place: 'Canadian Tire Centre	        ',
        status: 'Aborted',
        link: '#'
    },
    {
        month: 'July',
        day: '28',
        pays: 'Germany',
        state: 'Berlin',
        place: 'Waldbühne	        ',
        status: 'Aborted',
        link: '#'
    },
]


events.forEach((event) => {
    $('#events').append(`
    <div class="single-upcoming-shows d-flex align-items-center flex-wrap">
    <div class="shows-date">
        <h2>${event.day} <span>${event.month}</span></h2>
    </div>
    <div class="shows-desc d-flex align-items-center">
        <div class="shows-img">
            <img src="img/bg-img/s1.jpg" alt="">
        </div>
        <div class="shows-name">
           
            <p>${event.pays}, ${event.state}</p>
        </div>
    </div>
    <div class="shows-location">
        <p>${event.place}</p>
    </div>
    <div class="shows-time">
        <p>${event.status}</p>
    </div>
    <div class="buy-tickets">
        <a href="${event.link}" class="btn musica-btn">Buy Tikets</a>
    </div>
    </div>
    `)
})

