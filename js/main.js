// sideMenu.style.zIndex = "-1"

document.getElementById('menu-trigger').addEventListener('click', sideMenuAppears);
document.getElementById('menu-close').addEventListener('click', sideMenuDisappears);
const sideMenuControl = document.getElementById('side-menu');


function sideMenuAppears() {
    // document.getElementById('side-menu').classList.add('show-menu');
    sideMenuControl.classList.add('show-menu');
    // document.body.classList.add('.show-menu');
}

function sideMenuDisappears() {
    // document.getElementById('side-menu').classList.remove('show-menu');
    sideMenuControl.classList.remove('show-menu');
}

// Modal triggered by 'Settings' press
// document.querySelector('#test-area').addEventListener('click', showModal);
// document.querySelector('#close-dialog').addEventListener('click', closeModal);

document.getElementById('test-area').addEventListener('click', function () {
    document.getElementById('mask').classList.add('show-mask');
    document.getElementById('alert').classList.add('show-modal');
});
document.getElementById('alert').addEventListener('click', function () {
    document.getElementById('mask').classList.remove('show-mask');
    document.getElementById('alert').classList.remove('show-modal');
});


// const mask = document.querySelector("#mask");


// function showModal() {
//     document.getElementById('mask').classList.add('show-mask');
//     document.getElementById('alert').classList.add('show-modal');
//     console.log("we get this far");
// }
// function closeModal() {
// document.getElementById('alert').classList.remove('show-modal');
// console.log("we get this far now");
// }

const emailForm = document.querySelector("#email-form");
// emailForm.style.display = "none";

const emailFormCapture = document.getElementById('email-form');
const apiFormCapture = document.getElementById('api-form');


emailFormCapture.style.display = "none";

// var apiValue = "";

apiFormCapture.addEventListener('submit', function (event) {

    event.preventDefault();

    var apiValue = document.getElementById('api').value;

    //Placeholder for validation of valid API key//

    console.log(apiValue);
    console.log(apiValue.length);

    if (apiValue.length === 36) {
        emailFormCapture.style.display = "block";
        apiFormCapture.style.display = "none";
    }
    else {
        emailFormCapture.style.display = "none";
        apiFormCapture.style.display = "block";
    }

    emailFormCapture.addEventListener('submit', function (event) {

        event.preventDefault();

        const email = document.getElementById('email').value;

        console.log(email);
        console.log(apiValue);


        //Placeholder for validation of valid email address//
        // async function handleWeatherRequest(event){

        if (apiValue.length === 36) { anyname(email, apiValue) }
        console.log(email);
        console.log(apiValue);

        async function anyname() {
            console.log(email);
            console.log(apiValue);

            const urlString = `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${apiValue}`;

            const response = await fetch(urlString);

            const data = await response.json();

            console.log(data);

        }



        // emailFormCapture.reset();
    });
    // apiFormCapture.reset();

    // document.getElementById('trials').addEventListener('click', function () {
    //     console.log("test");
    // });

});

// buildUrl()
// async function buildUrl(email, apiValue) {
//     console.log(email);
//     console.log(apiValue);



//     const urlString = `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${apiValue}`;

//     const response = await fetch(urlString);

//     const data = await response.json();

//     // console.log(data.main.temp - 273.15)

// }




