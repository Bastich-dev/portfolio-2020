


db.collection('presets').onSnapshot(presets => {

    let value = $('select[name="select_preset"]').val()

    $('select[name="select_preset"]').empty()

    $('select[name="select_preset"]').append(`<option value=""></option>`)
    presets.forEach((preset) => {
        $('select[name="select_preset"]').append(`<option value="${preset.id}">${preset.data().nom}</option>`)
        console.log(preset)
    })

    $('select[name="select_preset"]').val(value)
})


$('#add_preset').on('click', function () {
    db.collection('presets').add({
        nom: 'Preset_Custom',
        emission: '',
        studio: '',
        diffusion: '',
        talents: [],
        hr_debut: '' + ':' + '',
        hr_fin: '' + ':' + '',
        theme: [],
        producteur: '',
        realisation: '',
        graphisme: '',
        decors: '',
        son: '',
        assist_video: '',
        consignes: '',
        cathering: false,
        transport: false,
    }).then(ref => {
        $('select[name="select_preset"]').empty()
        db.collection('presets').get().then(presets => {
            $('select[name="select_preset"]').append(`<option value=""></option>`)
            presets.forEach((preset, i) => {
                $('select[name="select_preset"]').append(`<option value="${preset.id}">${preset.data().nom}</option>`)
                if (preset.id == ref.id) {
                    $('select[name="select_preset"]').val(preset.id)
                    $('#delete_preset').prop('disabled', false)
                    $('#edit_preset').prop('disabled', false)
                    $('input[name="preset_nom"]').val(preset.data().nom)
                    $('input[name="preset_emission"]').val('')
                    $('input[name="preset_studio"]').val('')
                    $('input[name="preset_diffusion"]').val('')
                    $('select[name="preset_hrd_1"]').val('')
                    $('select[name="preset_hrd_2"]').val('')
                    $('select[name="preset_hrf_1"]').val('')
                    $('select[name="preset_hrf_2"]').val('')
                    $('input[name="preset_producteur"]').val('')
                    $('input[name="preset_realisation"]').val('')
                    $('input[name="preset_graphisme"]').val('')
                    $('input[name="preset_decors"]').val('')
                    $('input[name="preset_son"]').val('')
                    $('input[name="preset_assist_video"]').val('')
                    $('input[name="preset_consignes"]').val('')
                    $('input[name="preset_cathering"]').prop('checked', false)
                    $('input[name="preset_transport"]').prop('checked', false)
                    $('input[name="preset_talents"]').val('')
                    $('input[name="preset_theme"]').val('')
                    let suggestions = []
                    db.collection('champs').doc('Talents').get().then(talents => {
                        talents.data().champs_auto.forEach((talent, i) => {
                            suggestions.push(talent)
                        })
                    }).then(() => {
                        $('input[name="preset_talents"]').amsifySuggestags({
                            type: 'materialize',
                            suggestions: suggestions,

                        });
                    })

                    let suggestions_2 = []
                    db.collection('champs').doc('Theme').get().then(talents => {
                        talents.data().champs_auto.forEach((talent, i) => {
                            suggestions_2.push(talent)
                        })
                    }).then(() => {
                        $('input[name="preset_theme"]').amsifySuggestags({
                            type: 'materialize',
                            suggestions: suggestions_2,

                        });
                    })
                }
            })
        })

    }).then(() => {

        new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Un préset a été ajouté");
        document.getElementById('sound-success').play()
    })
})



$('#delete_preset').on('click', function () {

    if (confirm('Voulez vous vriament supprimer ce preset ?')) {

        db.collection('presets').doc($('select[name="select_preset"]').val()).get().then(preset => {
            preset.ref.delete()
        }).then(ref => {
            $('select[name="select_preset"]').val('')
            new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Le préset a été supprimé");
            document.getElementById('sound-success').play()
        }).then(() => {
            $('select[name="select_preset"]').change()
        })



    }


})






$('select[name="select_preset"]').on('change', function () {

    if ($(this).val() == '') {
        $('#delete_preset').prop('disabled', true)
        $('#edit_preset').prop('disabled', true)
        $('input[name="preset_nom"]').val('')
        $('input[name="preset_emission"]').val('')
        $('input[name="preset_studio"]').val('')
        $('input[name="preset_diffusion"]').val('')
        $('select[name="preset_hrd_1"]').val('')
        $('select[name="preset_hrd_2"]').val('')
        $('select[name="preset_hrf_1"]').val('')
        $('select[name="preset_hrf_2"]').val('')
        $('input[name="preset_producteur"]').val('')
        $('input[name="preset_realisation"]').val('')
        $('input[name="preset_graphisme"]').val('')
        $('input[name="preset_decors"]').val('')
        $('input[name="preset_son"]').val('')
        $('input[name="preset_assist_video"]').val('')
        $('input[name="preset_consignes"]').val('')
        $('input[name="preset_cathering"]').prop('checked', false)
        $('input[name="preset_transport"]').prop('checked', false)
        $('input[name="preset_talents"]').val('')
        $('input[name="preset_theme"]').val('')
        $('input[name="preset_talents"]').amsifySuggestags()
        $('input[name="preset_theme"]').amsifySuggestags()
    }
    else {
        $('#delete_preset').prop('disabled', false)
        $('#edit_preset').prop('disabled', false)

        db.collection('presets').doc($(this).val()).get().then((preset) => {


            $('input[name="preset_nom"]').val(preset.data().nom)
            $('input[name="preset_emission"]').val(preset.data().emission)
            $('input[name="preset_studio"]').val(preset.data().studio)
            $('input[name="preset_diffusion"]').val(preset.data().diffusion)
            $('select[name="preset_hrd_1"]').val(preset.data().hr_debut.split(':')[0])
            $('select[name="preset_hrd_2"]').val(preset.data().hr_debut.split(':')[1])
            $('select[name="preset_hrf_1"]').val(preset.data().hr_fin.split(':')[0])
            $('select[name="preset_hrf_2"]').val(preset.data().hr_fin.split(':')[1])
            $('input[name="preset_producteur"]').val(preset.data().produteur)
            $('input[name="preset_realisation"]').val(preset.data().realisation)
            $('input[name="preset_graphisme"]').val(preset.data().graphisme)
            $('input[name="preset_decors"]').val(preset.data().decors)
            $('input[name="preset_son"]').val(preset.data().son)
            $('input[name="preset_assist_video"]').val(preset.data().assist_video)
            $('input[name="preset_consignes"]').val(preset.data().consignes)

            $('input[name="preset_cathering"]').prop('checked', preset.data().cathering)
            $('input[name="preset_transport"]').prop('checked', preset.data().transport)

            $('input[name="preset_talents"]').val(preset.data().talents.join(','))
            $('input[name="preset_theme"]').val(preset.data().theme.join(','))

            let suggestions = []
            db.collection('champs').doc('Talents').get().then(talents => {
                talents.data().champs_auto.forEach((talent, i) => {
                    suggestions.push(talent)
                })
            }).then(() => {
                $('input[name="preset_talents"]').amsifySuggestags({
                    type: 'materialize',
                    suggestions: suggestions,

                });
            })

            let suggestions_2 = []
            db.collection('champs').doc('Theme').get().then(talents => {
                talents.data().champs_auto.forEach((talent, i) => {
                    suggestions_2.push(talent)
                })
            }).then(() => {
                $('input[name="preset_theme"]').amsifySuggestags({
                    type: 'materialize',
                    suggestions: suggestions_2,

                });
            })

        })
    }




})



db.collection('presets').onSnapshot((presets) => {
    $('select[name="use_preset"]').empty()
    $('select[name="use_preset"]').append(`<option value=""></option>`)
    presets.forEach(preset => {
        console.log(preset.data())
        $('select[name="use_preset"]').append(`<option value="${preset.id}">${preset.data().nom}</option>`)
    })
})



$("#btn_use_preset").on('click', function () {


    db.collection('presets').doc($('select[name="use_preset"]').val()).get().then((preset) => {
        console.log(preset.data())

        $('input[name="Emission"]').val(preset.data().emission)
        $('input[name="Studio"]').val(preset.data().studio)
        $('input[name="Diffusion"]').val(preset.data().diffusion)
        $('select[name="hr_debut_1"]').val(preset.data().hr_debut.split(':')[0])
        $('select[name="hr_debut_2"]').val(preset.data().hr_debut.split(':')[1])
        $('select[name="hr_fin_1"]').val(preset.data().hr_fin.split(':')[0])
        $('select[name="hr_fin_2"]').val(preset.data().hr_fin.split(':')[1])
        $('input[name="Producteur"]').val(preset.data().produteur)
        $('input[name="Realisation"]').val(preset.data().realisation)
        $('input[name="Graphisme"]').val(preset.data().graphisme)
        $('input[name="Decors"]').val(preset.data().decors)
        $('input[name="Son"]').val(preset.data().son)
        $('input[name="Assist_video"]').val(preset.data().assist_video)
        $('input[name="Consignes"]').val(preset.data().consignes)

        $('input[name="cathering"]').prop('checked', preset.data().cathering)
        $('input[name="transport"]').prop('checked', preset.data().transport)

        $('input[name="Talents"]').val(preset.data().talents.join(','))
        $('input[name="Theme"]').val(preset.data().theme.join(','))

        new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success('Le préset  "' + preset.data().nom + '" a été chargé');
        document.getElementById('sound-success').play()

    }).then(() => {
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
        db.collection('champs').doc('Theme').get().then(talents => {
            talents.data().champs_auto.forEach((talent, i) => {
                suggestions_2.push(talent)
            })
        }).then(() => {
            $('input[name="Theme"]').amsifySuggestags({
                type: 'materialize',
                suggestions: suggestions_2,

            });
        })

    })
})



$('#form_preset').on('submit', function (e) {
    e.preventDefault()
    let infos = $(this).serializeArray()
    console.log(infos)


    db.collection('presets').doc(infos[0].value).update(
        {
            nom: $('input[name="preset_nom"]').val(),
            emission: $('input[name="preset_emission"]').val(),
            studio: $('input[name="preset_studio"]').val(),
            diffusion: $('input[name="preset_diffusion"]').val(),
            talents: $('input[name="preset_talents"]').val().split(','),
            hr_debut: $('select[name="preset_hrd_1"]').val() + ':' + $('select[name="preset_hrd_2"]').val(),
            hr_fin: $('select[name="preset_hrf_1"]').val() + ':' + $('select[name="preset_hrf_2"]').val(),
            theme: $('input[name="preset_theme"]').val().split(','),
            producteur: $('input[name="preset_producteur"]').val(),
            realisation: $('input[name="preset_realisation"]').val(),
            graphisme: $('input[name="preset_graphisme"]').val(),
            decors: $('input[name="preset_decors"]').val(),
            son: $('input[name="preset_son"]').val(),
            assist_video: $('input[name="preset_assist_video"]').val(),
            consignes: $('input[name="preset_consignes"]').val(),
            cathering: $('input[name="preset_cathering"]').prop('checked'),
            transport: $('input[name="preset_transport"]').prop('checked'),

        }).then(() => {
            new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success('Le préset  "' + $('input[name="preset_nom"]').val() + '" a été modifié');
            document.getElementById('sound-success').play()
        })

})