


for (let i = 0; i < 24; i++) {
    $('.hr').append(`<option value="${i < 10 ? '0' + i : '' + i}">${i < 10 ? '0' + i : '' + i}</option >`)
}

for (let i = 0; i < 60; i += 5) {
    $('.min').append(`<option value="${i < 10 ? '0' + i : '' + i}">${i < 10 ? '0' + i : '' + i}</option >`)
}





let suggestions = []
db.collection('champs').doc('Talents').get().then(talents => {
    talents.data().champs_auto.forEach((talent, i) => {
        suggestions.push(talent)
    })
}).then(() => {
    $('input[name="Talents"]').amsifySuggestags({
        type: 'materialize',
        suggestions: suggestions,

    });
})

let suggestions_2 = []
db.collection('champs').doc('Theme').get().then(Theme => {
    Theme.data().champs_auto.forEach((themee, i) => {
        suggestions_2.push(themee)
    })
}).then(() => {
    $('input[name="Theme"]').amsifySuggestags({
        type: 'materialize',
        suggestions: suggestions_2,

    });
})



db.collection('champs').doc('Talents').onSnapshot(talents => {
    $('#datalist_talents').empty()
    talents.data().champs_auto.forEach((talent, i) => {
        $('#datalist_talents').append(`<option value="${talent}">`)
    })
})



$('#recherche_talents').on('submit', function (e) {
    e.preventDefault()
    let submit = $(this).serializeArray()
    console.log(submit)

    db.collection('emissions').where('talents', 'array-contains', submit[0].value).get().then(infos => {

        console.log(infos)
        if (infos.empty == true) {
            new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).error("Erreur : Ce talent n'a participé à aucune émission \n Vérifiez l'orthographe .");
            document.getElementById('sound-error').play()
        }
        else {
            let nb = 0
            infos.forEach(emission => {
                if (emission.data().date.split('-')[1] == $('select[name="mois"]').val()) {
                    const timeToSec = time => time.split(':').reduce((acc, v) => acc * 60 + parseInt(v), 0);
                    const diffInSeconds = timeToSec(emission.data().hr_fin + ':00') - timeToSec(emission.data().hr_debut + ':00'); // 10800
                    nb += +(diffInSeconds)
                }
            })

            let sec_num = parseInt(nb, 10); // don't forget the second param
            let hours = Math.floor(sec_num / 3600);
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            let seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }


            nb = hours + ':' + minutes + ':' + seconds
            console.log(nb)

            $('#time_month').text(nb)
            new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success('Le talent a été trouvé ');
            document.getElementById('sound-success').play()
        }

    })

})



