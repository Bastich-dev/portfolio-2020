const tools = {
    react: `<article class="btn-projet"><i class="mr-2 icon-react"></i>React.js</article>`,
    wordpress: `<article class="btn-projet"><i class="mr-2 icon-wordpress"></i>Wordpress</article>`,
    jquery: `<article class="btn-projet"><i class="mr-2 icon-jquery"></i>jQuery</article>`,
    html: `<article class="btn-projet"><i class="mr-2 icon-html5"></i>Html 5</article>`,
    css: `<article class="btn-projet"><i class="mr-2 icon-css3"></i>CSS 3</article>`,
    firebase: `<article class="btn-projet"><i class="mr-2 icon-firebase"></i>Firebase</article>`,
    bootstrap: `<article class="btn-projet"><i class="mr-2 icon-bootstrap"></i>Bootstrap</article>`,
    javascript: `<article class="btn-projet"><i class="mr-2 icon-javascript"></i>Javascript</article>`,
    three: `<article class="btn-projet"><i class="mr-2 icon-webgl"></i>3D WebGL</article>`,
    pico8: `<article class="btn-projet">GameMaker Pico-8</article>`,
    canvas: `<article class="btn-projet"><i class="mr-2 icon-react"></i>HTML Canvas</article>`,
    cinema4d: `<article class="btn-projet"><i class="mr-2 icon-react"></i>Cinema 4D</article>`,
    webpack: `<article class="btn-projet"><i class="mr-2 icon-webpack"></i>Webpack</article>`,
    babel: `<article class="btn-projet"><i class="mr-2 icon-babel"></i>Babel</article>`,
    python: `<article class="btn-projet"><i class="mr-2 icon-python"></i>Python</article>`,
    django: `<article class="btn-projet"><i class="mr-2 icon-django"></i>Django</article>`,
    php: `<article class="btn-projet"><i class="mr-2 icon-react"></i>PHP</article>`,
    nextjs: `<article class="btn-projet"><i class="mr-2 icon-next-dot-js"></i>Next.js</article>`,
    vercel: `<article class="btn-projet"><i class="mr-2 icon-zeit"></i>Vercel</article>`,
    netlify: `<article class="btn-projet"><i class="mr-2 icon-netlify"></i>Netlify</article>`,

    material: `<article class="btn-projet"><i class="mr-2 icon-material-ui"></i>Material-ui</article>`,
};

export const projets_fr = [
    {
        titre: "Association Cortex",
        presentation: "Site web public",
        image: "media/img/cortexbrand.jpg",
        github: "",
        demo: "https://www.le-cortex.com",
        description:
            "Site web en production réalisé avec Next.js avec mise en place SEO. Nouveau média de vulgarisation scientifique qui a pour but de se développer au grand public. Réalisé de manière bénévole.",
        tools: [
            tools.nextjs,
            tools.react,
            tools.firebase,
            tools.bootstrap,
            tools.vercel,
        ],
    },
    {
        titre: "ImmunotherapIA",
        presentation: "Web application",
        image: "https://us.123rf.com/450wm/dotshock/dotshock1812/dotshock181201297/114265137-microscope-on-the-workplace-near-test-tubes-with-different-liquid-healthcare-and-biotechnology-conce.jpg?ver=6",
        github: "",
        demo: "https://capricorn-test.vercel.app/",
        description:
            "Exemple d'application que j'ai pu réaliser pour la start-up Magic Lemp. ID : test   /  PASSWORD : test",
        tools: [
            tools.react,
            tools.material,
            tools.webpack,
            tools.babel,
            tools.vercel,
        ],
    },

    {
        titre: "Paris events",
        presentation: "Site web",
        image: "https://www.austrianblog.com/media/images/paris-city-of-love.original.jpg",
        github: "",
        demo: "https://em-paris-events.vercel.app/",
        description:
            "Site d'évenements à Paris qui permet de rechercher des événements et de les sauvegardé. CSS Modules, utilisation d'une api, et animations",
        tools: [
            tools.react,
            tools.css,
            tools.webpack,
            tools.babel,
            tools.vercel,
        ],
    },

    {
        titre: "Quick Register",
        presentation: "Web application",
        image: "projets_demo/QuickRegister/Capture_QuickRegister.JPG",
        github: "",
        demo: "projets_demo/QuickRegister/index.html",
        description:
            "Web application ayant pour but de rendre service à un groupe ou entreprise. Permet de gérer des plannings ainsi que le personnel. Base de données manipulée avec Google Firebase.",
        tools: [
            tools.javascript,
            tools.jquery,
            tools.bootstrap,
            tools.firebase,
        ],
    },
    {
        titre: "Art.Space ",
        presentation: "Site web",
        image: "https://eval-em-mars-2021.netlify.app/assets/hero-tour.jpg",
        github: "",
        demo: "https://eval-em-mars-2021.netlify.app/tour.html",
        description:
            "Implémentation d'une maquette uniquement avec HTML, CSS et Javascript. SEO friendly et animations grâce à une librairie. ( Seulement les pages /tour.html et /price.html) ",
        tools: [tools.html, tools.css, tools.javascript],
    },
    {
        titre: "Gigaton - Pearl Jam ",
        presentation: "Site web",
        image: "projets_demo/Pearl_jam/Capture.JPG",
        github: "",
        demo: "projets_demo/Pearl_jam/index.html",
        description:
            "Projet ayant pour but de promouvoir le dernier album de Pearl Jam 'GIGATON' . Réalisé en une semaine, en collaboration avec un élève de la filière Communication & Marketing, ainsi qu'un élève de la filière Graphisme, je me suis occupé de la partie développement ",
        tools: [tools.html, tools.css, tools.javascript],
    },
];

export const ideas_fr = [
    {
        titre: "Hexagon Canvas multicolor interaction",
        presentation: "Web Interaction",
        image: "projets_demo/hex_canvas/hex-canvas_capture.JPG",
        github: "",
        demo: "https://codepen.io/bastosc/pen/BaoEmoJ",
        description:
            "Interaction avec la souris, dessine un point multicolor qui s'estompe avec le temps, avec un calque d'hexagonne en premier plan.",
        tools: [tools.javascript, tools.canvas],
    },
    {
        titre: "Hexagon Three background interaction",
        presentation: "Web Interaction",
        image: "projets_demo/Hex_three/hex_three.JPG",
        github: "",
        demo: "https://codepen.io/bastosc/pen/YzyMEGN",
        description:
            "Hexagon animation avec Three.js, interaction avec la souris, surélève les hexagones pointés.",
        tools: [tools.javascript, tools.three],
    },
    {
        titre: "Pochette Vinyl 3D",
        presentation: "Model 3D",
        image: "projets_demo/pochette/pochette.JPG",
        github: "",
        demo: "projets_demo/pochette/index.html",
        description:
            "Pochette d'album vinyl en 3D, réalisé pour un projet de promotion du nouvel album de Pearl Jam 'Gigaton' . Modèle réalisé avec Cinéma 4D puis intégration dans le navigateur avec Three.js.",
        tools: [tools.cinema4d, tools.three],
    },
    {
        titre: "Hit that cubes !",
        presentation: "Digital Experience",
        image: "projets_demo/Hit_that_cubes/Capture_leap.JPG",
        github: "",
        demo: "projets_demo/Hit_that_cubes/index.html",
        description:
            "Expérience où l'utilisateur est plongé dans une scène 3D avec physique. L'utilisateur peux maipuler le cube, changer sa texture, changer sa taille, et même le lancer . Le kit 'Leap Motion' est nécessaire pour interagir avec le cube dans la scène",
        tools: [tools.javascript, tools.three],
    },
    {
        titre: "Cave Quest",
        presentation: "Jeux vidéo",
        image: "projets_demo/Cave_Quest/cave_quest2.jpg",
        github: "",
        demo: "projets_demo/Cave_Quest/cave_quest_demo.html",
        description:
            "Projet d'un jeu Aventure . On incarne un explorateur qui doit résussir 3 épreuves pour obtenir 3 clés qui lui permetteront d'accéder à la salle du trésor . Jeu réalisé en équipe avec le GameMaker Pico-8, je me suis occupé de la partie développement, codée en LUA .",
        tools: [tools.pico8],
    },
];
