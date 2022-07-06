// sideMenu.style.zIndex = "-1"

document.getElementById('menu-trigger').addEventListener('click', sideMenuAppears);
document.getElementById('menu-close').addEventListener('click', sideMenuDisappears);
const sideMenuControl = document.getElementById('side-menu');

const contactTable = document.getElementById('contact-information');
const dealTable = document.getElementById("deal-table");
const ticketTable = document.getElementById("ticket-table");


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
const domApi = document.getElementById('dom-api');
const errorMessage = document.getElementById('error-message');

// const dealTable = document.getElementById("deal-table");
// const rows = document.getElementById("deal-table").rows.length;


emailFormCapture.style.display = "none";
domApi.style.display = "none";

// var apiValue = "";

// const contactTableName = document.querySelector("#contact-name");

apiFormCapture.addEventListener('submit', function (event) {

    event.preventDefault();

    const apiValue = document.getElementById('api').value;

    errorMessage.innerHTML = "";

    //Placeholder for validation of valid API key//

    console.log(apiValue);
    console.log(apiValue.length);

    if (apiValue.length === 36) {
        emailFormCapture.style.display = "block";
        apiFormCapture.style.display = "none";
        domApi.innerHTML = apiValue;
        captureEmail(apiValue);
    }
    else {
        emailFormCapture.style.display = "none";
        apiFormCapture.style.display = "block";
        errorMessage.innerHTML = "Please enter a valid API key";
        apiFormCapture.reset();

    }
});

function captureEmail(apiValue) {
    emailFormCapture.addEventListener('submit', function (event) {

        event.preventDefault();

        const email = document.getElementById('email').value;

        errorMessage.innerHTML = "";

        console.log(email);
        console.log(apiValue);


        //Placeholder for validation of valid email address//
        // async function handleWeatherRequest(event){

        if (apiValue.length === 36) { getContact(email, apiValue) }
        console.log(email);
        console.log(apiValue);


    })
};

async function getContact(email, apiValue) {

    //Clear contact table//
    for (let i = 1; i < 10; i++) {
        contactTable.rows[i].cells[1].innerHTML = "";
    }
    //Clear deal table//
    const rows = document.getElementById("deal-table").rows.length;
    for (let i = 1; i <= (rows - 1); i++) {
        dealTable.deleteRow(1);
    }
    //Clear ticket table table//
    const ticketRows = document.getElementById("ticket-table").rows.length;
    for (let i = 1; i <= (ticketRows - 1); i++) {
        ticketTable.deleteRow(1);
    }

    console.log(email);
    console.log(apiValue);

    const urlString = `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${apiValue}`;

    const response = await fetch(urlString);

    const data = await response.json();

    console.log(data);
    console.log("Message ", data.message);

    if (data.status === "error") {
        errorMessage.innerHTML = `Response: ${data.message}`;
        emailFormCapture.reset();
    }



    const contactName = `${data.properties.firstname.value} ${data.properties.lastname.value}`
    const jobTitle = data.properties.jobtitle.value;

    console.log(contactName);

    contactTable.rows[1].cells[1].innerHTML = contactName;
    contactTable.rows[9].cells[1].innerHTML = email;
    contactTable.rows[6].cells[1].innerHTML = jobTitle;

    const companyId = data.properties.associatedcompanyid.value;

    if (data.properties.associatedcompanyid.value.length > 5) { getCompany(companyId, apiValue) }
    // console.log(email);
    // console.log(apiValue);
    // console.log(data.properties.associatedcompanyid.value);


    emailFormCapture.reset();

}

async function getCompany(companyId, apiValue) {

    // const companyId = data.properties.associatedcompanyid.value;

    const urlCompany = `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${apiValue}`;

    const response = await fetch(urlCompany);

    const data = await response.json();

    console.log(data);

    const companyName = data.properties.name.value;
    const companyAddress = `${data.properties.city.value}, ${data.properties.country.value}`;
    const companyDeals = data.properties.hs_num_open_deals.value;
    const industry = data.properties.industry.value;
    const portal = data.portalId;



    contactTable.rows[2].cells[1].innerHTML = companyName;
    contactTable.rows[3].cells[1].innerHTML = companyAddress;
    contactTable.rows[4].cells[1].innerHTML = industry;
    contactTable.rows[7].cells[1].innerHTML = companyDeals;
    contactTable.rows[5].cells[1].innerHTML = portal;




    // const dealTable = document.getElementById("deal-table");
    const rows = document.getElementById("deal-table").rows.length;

    //Clear deal table//
    // for (let i = 1; i <= (rows - 1); i++) {
    //     dealTable.deleteRow(1);
    // }

    // const ticketRows = document.getElementById("ticket-table").rows.length;

    // //Clear ticket table table//
    // for (let i = 1; i <= (ticketRows - 1); i++) {
    //     ticketTable.deleteRow(1);
    // }


    console.log(companyDeals);

    if (companyDeals > 0) {
        getDeals(companyId, apiValue, companyDeals, dealTable, rows, portal);
        console.log(apiValue);
    }
    // else { getTickets(apiValue, portal); }
}

// function clearDealTable() {
//     const dealTable = document.getElementById("deal-table");
//     const rows = document.getElementById("deal-table").rows.length;

//     //Clear deal table//
//     for (let i = 1; i <= (rows - 1); i++) {
//         dealTable.deleteRow(1);
//     }
// }

async function getDeals(companyId, apiValue, companyDeals, dealTable, rows, portal) {

    const urlDeals = `https://api.hubapi.com/deals/v1/deal/associated/company/${companyId}/paged?hapikey=${apiValue}&includeAssociations=true&limit=10&properties=dealname`;

    const response = await fetch(urlDeals);

    const data = await response.json();

    console.log(data);
    console.log(companyDeals);
    console.log(data.deals.length);

    const dealId = data.deals[0].dealId;
    console.log(dealId);

    console.log(`Rows ${rows}`);


    for (let i = 0; i < data.deals.length; i++) {
        let dealId = data.deals[i].dealId;

        console.log(`i=${i} and dealid=${dealId}`);
        console.log(`companyDeals=${companyDeals} and data.deal.length=${data.deals.length}`)

        if (companyDeals >= data.deals.length) { indivDeals(dealId, apiValue, dealTable, portal); }
        // else { getTickets(apiValue, portal); }

        async function indivDeals(dealId, apiValue, portal) {

            // const dealId = data.deals[2]

            const urlDeals = `https://api.hubapi.com/deals/v1/deal//${dealId}?hapikey=${apiValue}`;

            // https://api.hubapi.com/deals/v1/deal/18479339?hapikey=demo        

            const response = await fetch(urlDeals);

            const data = await response.json();

            console.log(data);
            // if (data.deal.isDeleted.value = )
            var row = dealTable.insertRow(1);

            var dealName = row.insertCell(0);
            var dealStage = row.insertCell(1);
            var amount = row.insertCell(2);
            var closeDate = row.insertCell(3);

            dealName.innerHTML = data.properties.dealname.value;;
            dealStage.innerHTML = data.properties.dealstage.value;
            amount.innerHTML = `$ ${data.properties.amount.value}`;

            // const milliseconds = (data.properties.closedate.value * 1);

            let dealCloseDate = new Date(data.properties.closedate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let dealYear = dealCloseDate.getFullYear();
            let dealMonth = months[dealCloseDate.getMonth()];
            let dealDate = dealCloseDate.getDate();

            console.log("DDMMMYYY ", dealDate, dealMonth, dealYear);


            // const dateObject = new Date(milliseconds);
            // var year = dateObject.getFullYear();
            // console.log("human ", year);
            // const humanDateFormat = dateObject.toLocaleString("en-US", { year: "numeric" });
            // console.log("human date", humanDateFormat);

            closeDate.innerHTML = `${dealDate} ${dealMonth} ${dealYear}`


            // console.log(data);
            // console.log(companyDeals);
            // console.log(data.deals.length);
        }
        contactTable.rows[7].cells[1].innerHTML = i + 1;
        // getTickets(apiValue, portal);

    }
    console.log("API & Portal being passed: ", apiValue, portal);

    getTickets(apiValue, portal);
}

async function getTickets(companyId, apiValue, portal) {

    // const ticketRows = document.getElementById("ticket-table").rows.length;
    // //Clear ticket table table//
    // for (let i = 1; i <= (ticketRows - 1); i++) {
    //     ticketTable.deleteRow(1);
    // }

    console.log("API & Portal having being passed: ", apiValue, portal);

    const domPortal = contactTable.rows[5].cells[1].innerHTML;
    const apiFromDom = domApi.innerHTML;

    // const ticketTable = document.getElementById("ticket-table");

    console.log("portal from DOM", domPortal);
    console.log("API from DOM", apiFromDom);


    console.log("API key:", apiValue);
    console.log("Portal from variable:", portal);

    const urlTicket = `https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=${apiFromDom}&properties=subject&properties=content&properties=hs_pipeline_stage&properties=createdate&properties=closedate`;

    // https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=demo&properties=subject&properties=content&properties=hs_pipeline&properties=hs_pipeline_stage


    const response = await fetch(urlTicket);

    const data = await response.json();

    console.log(data);

    console.log(data.objects.length);

    console.log("From array ", data.objects[0].portalId);
    console.log(data.objects[0].properties);

    let ticketCount = 0;

    for (let i = 0; i <= data.objects.length; i++) {
        // console.log("From array ", data.objects[i].portalId);
        if (domPortal == data.objects[0].portalId) {
            ticketCount = ticketCount + 1;

            console.log(ticketCount);

            var row = ticketTable.insertRow(1);

            var ticketName = row.insertCell(0);
            var ticketContent = row.insertCell(1);
            var ticketStatus = row.insertCell(2);
            var ticketCreateDate = row.insertCell(3);

            ticketName.innerHTML = data.objects[i].properties.subject.value;
            ticketContent.innerHTML = data.objects[i].properties.content.value;

            if (data.objects[i].properties.hs_pipeline_stage.value == '1') {
                ticketStatus.innerHTML = "New"
            }
            else if (data.objects[i].properties.hs_pipeline_stage.value == '2') {
                ticketStatus.innerHTML = "Waiting on contact"
            }
            else if (data.objects[i].properties.hs_pipeline_stage.value == '3') {
                ticketStatus.innerHTML = "Waiting on us"
            }
            else if (data.objects[i].properties.hs_pipeline_stage.value == '4') {
                ticketStatus.innerHTML = "Closed"
            }


            let ticketOpenDate = new Date(data.objects[i].properties.createdate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let ticketYear = ticketOpenDate.getFullYear();
            let ticketMonth = months[ticketOpenDate.getMonth()];
            let ticketDate = ticketOpenDate.getDate();

            console.log("DDMMMYYY ", ticketDate, ticketMonth, ticketYear);
            ticketCreateDate.innerHTML = `${ticketDate} ${ticketMonth} ${ticketYear}`
        }
        contactTable.rows[8].cells[1].innerHTML = ticketCount;


    }




    // https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=demo&properties=subject&properties=content&properties=hs_pipeline&properties=hs_pipeline_stage



}


