// sideMenu.style.zIndex = "-1"

document.getElementById('menu-trigger').addEventListener('click', sideMenuAppears);
document.getElementById('menu-close').addEventListener('click', sideMenuDisappears);

function sideMenuAppears() {
    document.getElementById('side-menu').classList.add('show-menu');
    // document.body.classList.add('.show-menu');
}

function sideMenuDisappears() {
    document.getElementById('side-menu').classList.remove('show-menu');
}

document.getElementById('test-area').addEventListener('click', showModal);
document.getElementById('close-dialog').addEventListener('click', closeModal);

function showModal() {
    document.getElementById('alert').classList.add('show-modal');
    console.log("we get this far");
}

function closeModal() {
    document.getElementById('alert').classList.remove('show-modal');
    console.log("we get this far now");
}

const emailFormCapture = document.getElementById('email-form');

emailFormCapture.addEventListener('submit', function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value;

    //Placeholder for validation of valid email address//

    console.log(email);

    emailFormCapture.reset();
});