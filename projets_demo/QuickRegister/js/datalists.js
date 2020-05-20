
let champs = ['emission', 'studio', 'diffusion', 'producteur', 'realisation', 'graphisme', 'decors', 'son', 'assist_video', 'consignes']

db.collection('champs').onSnapshot(() => {
    for (let i = 0; i < champs.length; i++) {
        $('#datalist_' + champs[i]).empty()
        const doc = champs[i].charAt(0).toUpperCase() + champs[i].slice(1);
        db.collection('champs').doc(doc).get().then((champ) => {
            champ.data().champs_auto.forEach(element => {
                $('#datalist_' + champs[i]).append(`<option value="${element}">`)
            });
        })
    }
})

