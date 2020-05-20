
// Anim on First connection
let page_active = 'ajouter_emission'
if (localStorage.getItem('animFirstConnection') == 'true') {
    $('#accordionSidebar').addClass(' animated fadeInLeft delay-1s')
    $('#topbar_nav').addClass(' animated fadeInDown delay-2s')
    $('#card_ajouter_emission').addClass('animated bounceInRight delay-3s')
    localStorage.setItem('animFirstConnection', null)
    page_active = 'ajouter_emission'
    setTimeout(() => {
        $('#card_ajouter_emission').removeClass('delay-3s')
    }, 4200)
}

// Click handler for sidebar
let prevent = false
$('.nav-link_click').bind('click', function () {
    if (prevent == false) {
        prevent = true
        $('#card_' + page_active).removeClass('animated bounceInRight d-flex')
        $('#card_' + page_active).addClass('animated bounceOutRight')
        setTimeout(() => {
            $('.section').addClass('d-none')
            $('#card_' + page_active).removeClass('animated bounceOutRight')
            $('#card_' + $(this).attr('id').substr(5)).removeClass('d-none')
            $('#card_' + $(this).attr('id').substr(5)).addClass('animated bounceInRight d-flex')

            page_active = $(this).attr('id').substr(5)



            prevent = false
        }, 400)
    }

})


// Add options pour nb_semaine
for (let i = 1; i < 53; i++) { $("select[name='nb_semaine']").append(` <option value="${i < 10 ? '0' + i : i}"> ${i}</option>`) }



// Ajouter Emission on submit
$('#ajouter_emission').on('submit', function (e) {
    e.preventDefault()

    let submit = $(this).serializeArray()
    console.log(submit)
    db.collection('emissions').add({
        date: submit[0].value,
        semaine: GetWeekAndDay(submit[0].value).weekNumber,
        emission: submit[1].value,
        studio: submit[2].value,
        diffusion: submit[3].value,
        talents: (submit[4].value).split(','),
        hr_debut: submit[5].value + ':' + submit[6].value,
        hr_fin: submit[7].value + ':' + submit[8].value,
        theme: (submit[9].value).split(','),
        producteur: submit[10].value,
        realisation: submit[11].value,
        graphisme: submit[12].value,
        decors: submit[13].value,
        son: submit[14].value,
        assist_video: submit[15].value,
        consignes: submit[16].value,
        cathering: $("input[name='cathering']")[0].checked,
        transport: $("input[name='transport']")[0].checked,
    }).then(() => {
        new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("L'émission a été ajouté avec succès");
        document.getElementById('sound-success').play()
    });
})



// Auto select Semaines & jour
$("input[name='date']").on('change', function () {
    $("input[name='semaine']").val(GetWeekAndDay($(this).val()).weekNumber)
    $("select[name='jour']").val(GetWeekAndDay($(this).val()).dayName)
})

$('#viderchamps').on('click', function () {
    $('#card_ajouter_emission').find('input:not(:button):not(:submit)').val('')
    $('#card_ajouter_emission').find('input:checkbox').prop("checked", false);
    $('#card_ajouter_emission').find('select').val('')
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


    new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Les champs ont été vidés");
    document.getElementById('sound-success').play()
})


$("select[name='nb_semaine']").on('change', function () {
    $('#table_semaine').empty()
    db.collection('emissions').where('semaine', '==', Number($("select[name='nb_semaine']").val())).onSnapshot(infos => {
        console.log(infos)
        infos.forEach(emission => {

            $('#table_semaine').append(`
<tr class="row100" id='${emission.id}'>
<td class="column100 column1" data-column="column1"> ${emission.data().date}
</td>
<td class="column100 column2" data-column="column2">${GetWeekAndDay(emission.data().date).dayName}</td>
<td class="column100 column3" data-column="column3">${emission.data().emission}</td>
<td class="column100 column4" data-column="column4">${emission.data().studio}</td>
<td class="column100 column5" data-column="column5">${emission.data().diffusion}</td>
<td class="column100 column6" data-column="column6">${emission.data().talents.join('-')}</td>
<td class="column100 column7" data-column="column7">${emission.data().hr_debut}</td>
<td class="column100 column8" data-column="column8">${emission.data().hr_fin}</td>
<td class="column100 column2" data-column="column2">${emission.data().theme}</td>
<td class="column100 column3" data-column="column3">${emission.data().producteur}</td>
<td class="column100 column4" data-column="column4">${emission.data().realisation}</td>
<td class="column100 column5" data-column="column5">${emission.data().graphisme}</td>
<td class="column100 column6" data-column="column6">${emission.data().decors}</td>
<td class="column100 column7" data-column="column7">${emission.data().son}</td>
<td class="column100 column8" data-column="column8">${emission.data().assist_video}</td>
<td class="column100 column6" data-column="column6">${emission.data().consignes}</td>
<td class="column100 column7" data-column="column7">  <input type="checkbox"
class="mt-1 ml-2 form-control form-control-user"
name='cathering' ${emission.data().cathering == true ? 'checked' : ''}></td>
<td class="column100 column8" data-column="column8"><input type="checkbox"
class="mt-1 ml-2 form-control form-control-user"
name='cathering' ${emission.data().transport == true ? 'checked' : ''}></td>
    </tr>`)
        })
    })
})



$('#table_semaine').on('click', 'td', function () {
    console.log('aiiiii')
    console.log($(this).text())
})



//  Tableau rechercher emission
db.collection('emissions').onSnapshot((doc) => {


    $('#EmissionsTable').DataTable().clear()
    doc.forEach(emission => {

        $('#EmissionsTable').DataTable().row.add([
            `<td>   <button type="button" id='${emission.id}'
                class="mt-2  btn btn-success find_emission">
                <span class="icon text-white">
                    <i class="fas fa-edit"></i>
                </span>
            </button> </td>`,
            `<td> ${emission.data().date}</td>`,
            `<td> <p class='sem'>${GetWeekAndDay(emission.data().date).weekNumber}</p> </td>`,
            `<td>${GetWeekAndDay(emission.data().date).dayName} </td>`,
            `<td> ${emission.data().emission}</td>`,
            `<td> ${emission.data().studio}</td>`,
            `<td> ${emission.data().diffusion}</td>`,
            `<td> ${emission.data().talents}</td>`,
            `<td> ${emission.data().hr_debut} </td>`,
            `<td> ${emission.data().hr_fin} </td>`,
            `<td> ${emission.data().theme}</td>`,
            `<td> ${emission.data().producteur}</td>`,
            `<td> ${emission.data().realisation}</td>`,
            `<td> ${emission.data().graphisme}</td>`,
            `<td> ${emission.data().decors}</td>`,
            `<td> ${emission.data().son}</td>`,
            `<td> ${emission.data().assist_video}</td>`,
            `<td> ${emission.data().consignes}</td>`,
            `<td>  ${emission.data().cathering == true ? "<p class='d-none'>cathering</p>" : ''}   <input type="checkbox"
                class="mt-1 ml-2 form-control form-control-user"
                name='cathering' ${emission.data().cathering == true ? 'checked' : ''} disabled> </td>`,
            `<td>  ${emission.data().transport == true ? "<p class='d-none'>transport</p>" : ''}   <input type="checkbox"
                class="mt-1 ml-2 form-control form-control-user"
                name='cathering' ${emission.data().transport == true ? 'checked' : ''} disabled> </td>`,
        ]).draw();
        $('#EmissionsTable').DataTable().draw()
    });
})




$('#EmissionsTable').on('click', '.find_emission', function () {

    console.log('aiiii')
    $('#href-semaines').click()
    $('select[name="nb_semaine"]').val('' + $(this).parent().parent().find('.sem').text())
    $('select[name="nb_semaine"]').change()

    console.log($(this).attr('id'))

    setTimeout(() => {
        // console.log($('#table_semaine').find($('#' + $(this).attr('id'))))
        console.log($('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')))

        $('html, body').animate({ scrollTop: $('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')).offset().top - 200 }, 1000);

        // .hover {
        //     background-color: #f2f2f2;
        //   }




        $('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')).animate({
            backgroundColor: "#5cb85c",
        }, 1500, function () {
            $('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')).animate({
                backgroundColor: "#fff",
            }, 1500, function () {

                $('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')).mouseover(function () {
                    $(this).css({
                        'background-color': '#f2f2f2'
                    })
                })
                $('#table_semaine').find(('tr[id="' + $(this).attr('id') + '"]')).mouseleave(function () {
                    $(this).css({
                        'background-color': '#fff'
                    })
                })

            })
        })

    }, 600)



});

$('#update_preset').css({ 'display': 'none' })
$('#ajoute_preset').css({ 'display': 'none' })


$('#href-champs').on('click', function () {
    setTimeout(() => {
        $('#update_preset').css({ 'display': 'none' })
        $('#ajoute_preset').css({ 'display': 'none' })
        $('select[name=select_champs]').val('')
        $('#affiche_preset').empty()
    }, 400)

})

$('select[name=select_champs]').on('change', function () {
    $('#affiche_preset').empty()

    if ($(this).val() == '') {
        $('#update_preset').css({ 'display': 'none' })
        $('#ajoute_preset').css({ 'display': 'none' })
    }
    else {
        $('#update_preset').css({ 'display': 'flex' })
        $('#ajoute_preset').css({ 'display': 'flex' })
        db.collection('champs').doc($(this).val()).get().then(champs => {
            let lul = champs.data().champs_auto[0]

            for (let i in champs.data().champs_auto) {
                $('#affiche_preset').append(`
                <div class="form-group col-lg-7 col-sm-8 mb-2 d-flex ">
                <input type="text"
                    class="mt-1 ml-2 form-control form-control-user text-center input_champs_auto" id='${champs.data().champs_auto[i]}' value='${champs.data().champs_auto[i]}'>
                    <i class="fas fa-times-circle fa-3x ml-3 text-danger delete_champ"
                    style="float: right;   cursor: pointer;" ></i>
            </div>`)
            }
        }).then(() => {

            $('.delete_champ').unbind()
            $('.delete_champ').bind('click', function () {
                console.log($(this).prev().val())
                db.collection('champs').doc($('select[name=select_champs]').val()).update({
                    champs_auto: firebase.firestore.FieldValue.arrayRemove($(this).prev().val())
                }).then(() => {
                    new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Le champ automatique a été supprimé avec succès");
                    document.getElementById('sound-success').play()
                    $('select[name=select_champs]').change()
                })
            })
        })
    }


})

$('#update_champs').on('click', function () {
    let updates = []
    $('.input_champs_auto').each(function (e) {
        updates.push($(this).val())
    })
    db.collection('champs').doc($('select[name=select_champs]').val()).update({
        champs_auto: firebase.firestore.FieldValue.delete()
    }).then(() => {
        db.collection('champs').doc($('select[name=select_champs]').val()).update({
            champs_auto: updates
        }).then(() => {
            new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Le champ automatique a été modifié avec succès");
            document.getElementById('sound-success').play()
            $('select[name=select_champs]').change()
        })
    })
})



$('#add_champ').on('click', function () {


    db.collection('champs').doc($('select[name=select_champs]').val()).update({
        champs_auto: firebase.firestore.FieldValue.arrayUnion($(this).prev().val())
    }).then(() => {
        new Notyf({ duration: 4000, position: { x: 'center', y: 'bottom', } }).success("Le champ automatique a été ajouté avec succès");
        document.getElementById('sound-success').play()
        $('select[name=select_champs]').change()
        $(this).prev().val('')
    })



})












/////////////////////   FUNCTIONS ///////////////////////


function GetWeekAndDay(date) {

    Date.prototype.getWeek = function () {
        let onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() - 1) / 7);
    }

    let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let d = new Date(date);
    let dayName = days[d.getDay()];
    let weekNumber = d.getWeek();

    return {
        weekNumber: weekNumber,
        dayName: dayName
    }
}











