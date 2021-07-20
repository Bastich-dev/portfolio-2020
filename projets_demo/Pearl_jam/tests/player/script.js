console.clear();

class musicPlayer {
    constructor() {
        this.play = this.play.bind(this);
        this.playBtn = document.getElementById('play');
        this.playBtn.addEventListener('click', this.play);
        this.controlPanel = document.getElementById('control-panel');
        this.infoBar = document.getElementById('info');
    }

    play() {
        let controlPanelObj = this.controlPanel,
            infoBarObj = this.infoBar
        Array.from(controlPanelObj.classList).find(function (element) {
            if (element !== "active") {
                document.querySelector('#song').play()
            }
            else {
                document.querySelector('#volume').style.visibility = 'hidden';
                affiche_volume = false;
                document.querySelector('#song').pause()
            }
            return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
        });

        Array.from(infoBarObj.classList).find(function (element) {

            return element !== "active" ? infoBarObj.classList.add('active') : infoBarObj.classList.remove('active');
        });
    }
}

const newMusicplayer = new musicPlayer();




let affiche_volume = false
document.querySelector('.sound').addEventListener('click', function () {
    affiche_volume = !affiche_volume
    if (affiche_volume == false) document.querySelector('#volume').style.visibility = 'hidden'
    if (affiche_volume == true) document.querySelector('#volume').style.visibility = 'visible'
})


console.log(document.querySelector('#song').volume)

document.querySelector('#change_volume').addEventListener('input', function () {
    document.querySelector('#song').volume = document.querySelector('#change_volume').value / 10

})