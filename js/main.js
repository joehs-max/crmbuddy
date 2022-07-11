// App level variables defined

let apiValue = "";
let email = "";

let errorMessage = document.getElementById('error-message');

const emailFormCapture = document.getElementById('email-form');
const apiFormCapture = document.getElementById('api-form');

const sideMenuControl = document.getElementById('side-menu');
const approveTrial = document.getElementById('approve-trial')

const contactTable = document.getElementById('contact-information');
const dealTable = document.getElementById("deal-table");
const ticketTable = document.getElementById("ticket-table");

let modalMessage = document.getElementById('modal-message');
let closeDialog = document.getElementById('close-dialog');


// Event listener setup - separate listeners for each nav/action button

document.getElementById('menu-trigger').addEventListener('click', sideMenuAppears);
document.getElementById('menu-close').addEventListener('click', sideMenuDisappears);

approveTrial.addEventListener('click', function (event) {
    event.preventDefault();
    if (approveTrial.innerHTML === "Data required") {
        modalMessage.innerHTML = "Please enter a valid API & email";
        closeDialog.innerHTML = "Cancel";
    }
    else if (approveTrial.innerHTML === "Approve") {
        modalMessage.innerHTML = "Press confirm to approve this trial";
        closeDialog.innerHTML = "Confirm";
    }
    document.getElementById('mask').classList.add('show-mask');
    document.getElementById('alert').classList.add('show-modal');
});

document.getElementById('alert').addEventListener('click', function () {
    document.getElementById('mask').classList.remove('show-mask');
    document.getElementById('alert').classList.remove('show-modal');
});

document.getElementById("stats").addEventListener('click', function (event) {
    event.preventDefault();
    modalMessage.innerHTML = "The Stats area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("deals").addEventListener('click', function (event) {
    event.preventDefault();
    modalMessage.innerHTML = "The Deals area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("tickets").addEventListener('click', function (event) {
    event.preventDefault();
    modalMessage.innerHTML = "The Tickets area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("trials").addEventListener('click', function (event) {
    event.preventDefault();
    modalMessage.innerHTML = "The Trials area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById('close-dialog').addEventListener('click', function (event) {
    event.preventDefault();
    closeModal();
});

// Show/hide side menu and modal/mask

function showModal() {
    document.getElementById('mask').classList.add('show-mask');
    document.getElementById('alert').classList.add('show-modal');
}
function closeModal() {
    document.getElementById('alert').classList.remove('show-modal');
}

function sideMenuAppears() {
    sideMenuControl.classList.add('show-menu');
}

function sideMenuDisappears() {
    sideMenuControl.classList.remove('show-menu');
}

// Ensure email capture form is hidden from initial load to allow for API capture

emailFormCapture.style.display = "none";

// Capture and validate API key

apiFormCapture.addEventListener('submit', function (event) {
    event.preventDefault();
    let apiValue = document.getElementById('api').value;
    errorMessage.innerHTML = ""; // Ensure any error messages are cleared

    if (apiValue.length === 36) {
        emailFormCapture.style.display = "block";
        apiFormCapture.style.display = "none";
        captureEmail(apiValue);
    }
    else {
        emailFormCapture.style.display = "none";
        apiFormCapture.style.display = "block";
        errorMessage.innerHTML = "Please enter a valid API key";
        apiFormCapture.reset();
    }
});

// Capture email address

function captureEmail(apiValue) {
    emailFormCapture.addEventListener('submit', function (event) {
        event.preventDefault();
        let email = document.getElementById('email').value;
        errorMessage.innerHTML = "";

        if (apiValue.length === 36) { getContact(email, apiValue) }
    })
};

// 1st API call to pull back contact details based on email address

async function getContact(email, apiValue) {

    //Clear any existing values from the contact table cells
    for (let i = 1; i < 10; i++) {
        contactTable.rows[i].cells[1].innerHTML = "";
    }
    //Clear deal table rows//
    const rows = document.getElementById("deal-table").rows.length;
    for (let i = 1; i <= (rows - 1); i++) {
        dealTable.deleteRow(1);
    }
    //Clear ticket table table rows//
    const ticketRows = document.getElementById("ticket-table").rows.length;
    for (let i = 1; i <= (ticketRows - 1); i++) {
        ticketTable.deleteRow(1);
    }
    //Reset any existing modal messages
    approveTrial.innerHTML = "Data required";
    modalMessage.innerHTML = "Please enter a valid API & email";
    closeDialog.innerHTML = "Cancel";

    const urlString = `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${apiValue}`;
    const response = await fetch(urlString);
    const data = await response.json();
    const contactId = data.vid;

    // Adjust the Approve free trial UI and messaging
    if (data.status === "error") {
        errorMessage.innerHTML = `Response: ${data.message}`;
        approveTrial.style.backgroundColor = "rgb(252, 143, 77)";
        emailFormCapture.reset();
    }
    else {
        approveTrial.style.backgroundColor = "green";
        approveTrial.innerHTML = "Approve";
    }

    const contactName = `${data.properties.firstname.value} ${data.properties.lastname.value}`

    const jobTitle = data.properties.jobtitle.value;

    // Populate HTML table with available values
    contactTable.rows[1].cells[1].innerHTML = contactName;
    contactTable.rows[6].cells[1].innerHTML = jobTitle;
    contactTable.rows[9].cells[1].innerHTML = email;


    // Prep to call Company information
    const companyId = data.properties.associatedcompanyid.value;

    if (data.properties.associatedcompanyid.value.length > 5) { getCompany(companyId, apiValue, contactId) }

    emailFormCapture.reset();
}

async function getCompany(companyId, apiValue, contactId) {
    const urlCompany = `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${apiValue}`;
    const response = await fetch(urlCompany);
    const data = await response.json();

    const companyName = data.properties.name.value;
    const companyAddress = `${data.properties.city.value}, ${data.properties.country.value}`;
    const companyDeals = data.properties.hs_num_open_deals.value;
    const industry = data.properties.industry.value;

    // Populate HTML table with available values
    contactTable.rows[2].cells[1].innerHTML = companyName;
    contactTable.rows[3].cells[1].innerHTML = companyAddress;
    contactTable.rows[4].cells[1].innerHTML = industry;
    contactTable.rows[5].cells[1].innerHTML = companyId;
    contactTable.rows[7].cells[1].innerHTML = companyDeals;

    if (companyDeals > 0) {
        getDeals(companyId, apiValue, dealTable, contactId);
    }
}

async function getDeals(companyId, apiValue, dealTable, contactId) {
    const urlDeals = `https://api.hubapi.com/deals/v1/deal/associated/company/${companyId}/paged?hapikey=${apiValue}&includeAssociations=true&limit=10&properties=dealname`;
    const response = await fetch(urlDeals);
    const data = await response.json();

    // Prep to cycle through individual API calls at the deal level
    for (let i = 0; i < data.deals.length; i++) {
        let dealId = data.deals[i].dealId;

        //Retrieve and use data to populate deal table in HTML
        if (data.deals.length > 0) {
            const urlDeals = `https://api.hubapi.com/deals/v1/deal//${dealId}?hapikey=${apiValue}`;
            const response = await fetch(urlDeals);
            const data = await response.json();
            // console.log(data);
            let row = dealTable.insertRow(1);

            let dealName = row.insertCell(0);
            let dealStage = row.insertCell(1);
            let amount = row.insertCell(2);
            let closeDate = row.insertCell(3);

            dealName.innerHTML = data.properties.dealname.value;;
            dealStage.innerHTML = data.properties.dealstage.value;
            amount.innerHTML = `$ ${data.properties.amount.value}`;

            //Translate UNIX millisecond date format to human readable
            let dealCloseDate = new Date(data.properties.closedate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let dealYear = dealCloseDate.getFullYear();
            let dealMonth = months[dealCloseDate.getMonth()];
            let dealDate = dealCloseDate.getDate();

            closeDate.innerHTML = `${dealDate} ${dealMonth} ${dealYear}`
        }
        //Populate count of deals in HTML contact table
        contactTable.rows[7].cells[1].innerHTML = i + 1;
    }

    getTickets(apiValue, contactId);
}

async function getTickets(apiValue, contactId) {
    const urlTicketObject = `https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/15?hapikey=${apiValue}`;
    const response = await fetch(urlTicketObject);
    const data = await response.json();

    // Prep to cycle through individual calls at the ticket level
    if (data.results.length > 0) {
        contactTable.rows[8].cells[1].innerHTML = data.results.length;

        //Retrieve and use data to populate ticket table in HTML
        for (let i = 0; i < data.results.length; i++) {
            const urlTickets = `https://api.hubapi.com/crm-objects/v1/objects/tickets/${data.results[i]}?hapikey=${apiValue}&properties=subject&properties=content&properties=hs_pipeline_stage&properties=createdate&properties=closedate`;
            const response = await fetch(urlTickets);
            const output = await response.json();

            let row = ticketTable.insertRow(1);

            let ticketName = row.insertCell(0);
            let ticketContent = row.insertCell(1);
            let ticketStatus = row.insertCell(2);
            let ticketCreateDate = row.insertCell(3);

            ticketName.innerHTML = output.properties.subject.value;
            ticketContent.innerHTML = output.properties.content.value;

            //Translate numeric ticket stage value to text
            if (output.properties.hs_pipeline_stage.value == '1') {
                ticketStatus.innerHTML = "New";
            }
            else if (output.properties.hs_pipeline_stage.value == '2') {
                ticketStatus.innerHTML = "Waiting on contact";
            }
            else if (output.properties.hs_pipeline_stage.value == '3') {
                ticketStatus.innerHTML = "Waiting on us";
            }
            else if (output.properties.hs_pipeline_stage.value == '4') {
                ticketStatus.innerHTML = "Closed";
            }

            //Translate UNIX millisecond date format to human readable
            let ticketOpenDate = new Date(output.properties.createdate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let ticketYear = ticketOpenDate.getFullYear();
            let ticketMonth = months[ticketOpenDate.getMonth()];
            let ticketDate = ticketOpenDate.getDate();

            ticketCreateDate.innerHTML = `${ticketDate} ${ticketMonth} ${ticketYear}`
        }
    }
}