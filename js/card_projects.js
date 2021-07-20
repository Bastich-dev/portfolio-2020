import { projets_fr } from "./projets-fr.js";
import { ideas_fr } from "./projets-fr.js";

let projets = projets_fr;
let ideas = ideas_fr;

afficheProjet();
afficheIdeas();

function afficheProjet() {
    projets.forEach((element, index) => {
        $("#cantainer_projet").append(`

        <div class="courses-container col-lg-6 col-sm-12">
        <div class="course row">
            <div class="course-preview col-lg-5 col-sm-12">
                <img class='d-none d-lg-block img-projet' src="${
                    element.image
                }" alt="">
            </div>
            <div class="course-info col-lg-7 col-sm-12">
                <h6>${element.presentation}</h6>
                <br>
                <h2>${element.titre}</h2>
                <p>${element.description}</p>

                <div class="comp-projet row">
                ${element.tools.join(" ")}
                </div>

                <div class='btn-container text-center'>

                ${
                    element.github == ""
                        ? ""
                        : `  <a
                href='${element.github}' target="_blank" rel="noopener noreferrer"
                class="btn btn-success p-2 pl-4 pr-4 mr-4 mt-3"
                style="font-size: 16px; color: white;"> <i class="mr-2 icon-github"></i>Github</a>
                `
                }
                
                  
        <a href='${
            element.demo
        }' class="btn btn-success p-2 pl-4 pr-4 mr-4 mt-3" target="_blank" rel="noopener noreferrer"
            style=" font-size: 16px; color: white;"> <i class="mr-2 icon-link"></i> Live
                        Demo</a>
                </div >
            </div >
        </div >
    </div >
        `);
    });
}

function afficheIdeas() {
    ideas.forEach((element, index) => {
        $("#cantainer_id").append(`
        <div class="courses-container col-lg-6 col-sm-12">
        <div class="course row">
            <div class="course-preview col-lg-5 col-sm-12">
                <img class='d-none d-lg-block img-projet' src="${
                    element.image
                }" alt="">
            </div>
            <div class="course-info col-lg-7 col-sm-12">
                <h6>${element.presentation}</h6>
                <br>
                <h2>${element.titre}</h2>
                <p>${element.description}</p>

                <div class="comp-projet row">
                ${element.tools.join(" ")}
                </div>

                <div class='btn-container text-center'>

                <div class='btn-container text-center'>

                ${
                    element.github == ""
                        ? ""
                        : `  <a
                href='${element.github}' target="_blank" rel="noopener noreferrer"
                class="btn btn-success p-2 pl-4 pr-4 mr-4 mt-3"
                style="font-size: 16px; color: white;"> <i class="mr-2 icon-github"></i>Github</a>
                `
                }
                
                  
        <a href='${
            element.demo
        }' class="btn btn-success p-2 pl-4 pr-4 mr-4 mt-3" target="_blank" rel="noopener noreferrer"
            style=" font-size: 16px; color: white;"> <i class="mr-2 icon-link"></i> Live
                        Demo</a>
                </div >
            </div >
        </div >
    </div >
        `);
    });
}

let about_1 = false;
let about_2 = false;
let scroll_position = window.scrollY;
window.scrollTo(window.scrollX, window.scrollY - 1);

document.addEventListener("scroll", function () {
    scroll_position = window.scrollY;

    if (about_1 == false) {
        if (
            scroll_position >
            document.getElementById("about").offsetTop - 400
        ) {
            $(".article-left").css({ visibility: "visible" });
            $(".article-left").addClass(
                "animate__animated animate__fadeInLeft"
            );
            about_1 = true;
        }
    }

    if (about_2 == false) {
        if (
            scroll_position >
            document.getElementById("about").offsetTop - 400
        ) {
            $(".article-right").css({ visibility: "visible" });
            $(".article-right").addClass(
                "animate__animated animate__fadeInRight"
            );
            about_2 = true;
        }
    }
});
