import { projets } from './projets.js';
import { ideas } from './projets.js';




projets.forEach((element, index) => {

    console.log(element.tools)
    $('#grid-projects').append(`
<li class="hexDiv" >
<div class="hexIn">
  <div class="hexLink" data-toggle="modal" data-target="#portfolioModal${index + 1}"  >
    <img src="${element.image}" alt="" />
    <h1>${element.titre}</h1>
    <p>${element.presentation}</p>
  </div>
</div>
</li>
`)


    $('#modals').append(`
    <!-- Portfolio Modal 1-->
    <div class="portfolio-modal modal fade" id="portfolioModal${index + 1}" tabindex="-1" role="dialog"
        aria-labelledby="portfolioModal${index + 1}Label" aria-hidden="true" >
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content bg-secondary" >
                <button class="close" type="button" data-dismiss="modal" aria-label="Close" style='float:right;'>
                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
                </button>
                <div class="modal-body text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">

                                <!-- Portfolio Modal - Title-->
                                    <h2 style='font-size: calc(4vh + 4vw);' class="text-white text-uppercase mb-0">${element.titre}</h2>

                           

                                <!-- Portfolio Modal - Image--><img class="img-fluid rounded mb-5"
                                    src='${element.image}' alt="" />


                              

                                 <!-- Portfolio Buttons -->     
                                    <p>
                                

                                    <a href="${element.demo}" class="hex-btn hex-btn-color  js-scroll-trigger"
                                    style="font-size: calc(0.8vh + 0.8vw);  text-decoration: none; position:relative"> <i
                                    class="fas fa-paperclip fa-fw mr-2"></i>Demo
                                    </a>

                                

                                
                                    ${element.github == '' ? '' : ` <a href="${element.github}" class="hex-btn hex-btn-color  js-scroll-trigger"
                                    style="font-size: calc(0.8vh + 0.8vw);  text-decoration: none; position:relative"> <i
                                    class="fab fa-github fa-fw mr-2"></i>Github
                                    </a>` }

                                    </p>

                                    <div class="main-wrapper">
                                    ${element.tools}
                                    </div>

                                <!-- Portfolio Modal - Text-->
                                    <p class="mb-5 text-white"> ${element.description} </p>

                                <!-- Portfolio Close Window-->
                                    <p class='mt-5'><button class="btn btn-primary text-white" href="#" data-dismiss="modal"><i
                                    class="fas fa-times fa-fw"></i>Fermer</button></p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)

});




ideas.forEach((element, index) => {

    console.log(element.tools)
    $('#grid-ideas').append(`
<li class="hexDiv">
<div class="hexIn">
  <div class="hexLink" data-toggle="modal" data-target="#portfolioModal${index + 1}" >
    <img src="${element.image}" alt="" />
    <h1>${element.titre}</h1>
    <p>${element.presentation}</p>
  </div>
</div>
</li>
`)


    $('#modals').append(`
    <!-- Portfolio Modal 1-->
    <div class="portfolio-modal modal fade" id="portfolioModal${index + 1}" tabindex="-1" role="dialog"
        aria-labelledby="portfolioModal${index + 1}Label" aria-hidden="true" >
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <button class="close" type="button" data-dismiss="modal" aria-label="Close" style='float:right;'>
                    <span aria-hidden="true"><i class="fas fa-times"></i></span>
                </button>
                <div class="modal-body text-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">

                                <!-- Portfolio Modal - Title-->
                                    <h2 style='font-size: calc(4vh + 4vw);' class="text-secondary text-uppercase mb-0">${element.titre}</h2>

                           

                                <!-- Portfolio Modal - Image--><img class="img-fluid rounded mb-5"
                                    src='${element.image}' alt="" />


                                    <div class="main-wrapper">
                                    ${element.tools}
                                    </div>

                                 <!-- Portfolio Buttons -->     
                                    <p>
                                    <a href='${element.demo}'> 
                                    <button class="m-1 btn btn-danger"><i
                                    class="fas fa-paperclip fa-fw"></i>Demo</button>
                                    </a>

                                
                                  ${element.github == '' ? '' : `  <a href='${element.github}'> 
                                  <button class="m-1 btn btn-dark"><i
                                  class="fab fa-github fa-fw"></i>Github</button>
                                  </a>` }

                                    </p>

                                <!-- Portfolio Modal - Text-->
                                    <p class="mb-5"> ${element.description} </p>

                                <!-- Portfolio Close Window-->
                                    <p class='mt-5'><button class="btn btn-dark" href="#" data-dismiss="modal"><i
                                    class="fas fa-times fa-fw"></i>Fermer</button></p>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)

});