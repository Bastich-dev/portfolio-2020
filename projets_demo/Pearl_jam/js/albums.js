const albums = [
    {
        title: 'TEN',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/0223194507ten.jpg',
        link: 'https://pearljam.com/music/album/ten',
        date: 'AUG. 27, 1991'
    },
    {
        title: 'Ten (Reissue)',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/0223164601xTenCover-250.jpg',
        link: 'https://pearljam.com/music/album/ten-reissue',
        date: 'MAR. 24, 2009'
    },
    {
        title: 'Vs.',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/0223194511vs.jpg',
        link: 'https://pearljam.com/music/album/vs',
        date: 'OCT. 19, 1993'
    },
    {
        title: 'Vs. and Vitalogy',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/146739831769a4900483881ceab3b433d573449810.jpeg',
        link: 'https://pearljam.com/music/album/vs-and-vitalogy-20th-anniversary-editions',
        date: 'MAR. 25, 2011'
    },
    {
        title: 'Vitalogy',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/146705358615f16cbe6ba7824e978e71a2d1e3b01c.jpg',
        link: 'https://pearljam.com/music/album/vitalogy',
        date: 'DEC. 6, 1994'
    },
    {
        title: 'No Code',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/1467053858f38820e819828757920ff62553d3f272.jpg',
        link: 'https://pearljam.com/music/album/no-code',
        date: 'AUG. 27, 1996'
    },
    {
        title: 'Yield',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/146705364672eb2779614ddaeff42cfbf870747be3.jpg',
        link: 'https://pearljam.com/music/album/yield',
        date: 'FEB. 3, 1998'
    },
    {
        title: 'Binaural',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/14670534484ae466277d40a33c794818dd9309a82f.jpg',
        link: 'https://pearljam.com/music/album/binaural',
        date: 'MAY. 16, 2000'
    },
    {
        title: 'Riot',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/14670535015bc0a66f237554c64a615c4a02705466.jpg',
        link: 'https://pearljam.com/music/album/riot-act',
        date: 'NOV. 12, 2002'
    },
    {
        title: 'Pearl Jam',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/146705338292a9031c4ea0f53a9f775f9bd6c6958c.jpg',
        link: 'https://pearljam.com/music/album/pearl-jam',
        date: 'MAY. 2, 2006'
    },
    {
        title: 'Backspacer',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/14670537393d01135e7ca3c717e8fe2e5c3c123fbe.jpg',
        link: 'https://pearljam.com/music/album/backspacer',
        date: 'SEP. 20, 2009'
    },
    {
        title: 'Lightning Bolt',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/1463090805020c40c2530cde7fe2b6e223731e7c10.jpg',
        link: 'https://pearljam.com/music/album/lightning-bolt',
        date: 'OCT. 15, 2013'
    },
    {
        title: 'Gigaton',
        img: 'https://downloads-pearljam-com.s3.amazonaws.com/img/album-art/1585260994e9baa31707c983c41eb47753c14e4029.jpg',
        link: 'https://pearljam.com/music/album/gigaton',
        date: 'MAR. 27, 2020'
    },
]









albums.forEach(album => {
    $('#albums').append(`
<div class="single-music-player">
                            <img src="${album.img}" alt="">
                            <a href="${album.link}">
                                <div class="music-info d-flex justify-content-between">
                                    <div class="music-text">
                                        <h5>${album.title}</h5>
                                        <p>${album.date}</p>
                                    </div>
                                </div>
                            </a>
                        </div>`)
})
