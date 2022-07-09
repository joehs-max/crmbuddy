let apiValue = "";
let email = "";


document.getElementById('menu-trigger').addEventListener('click', sideMenuAppears);
document.getElementById('menu-close').addEventListener('click', sideMenuDisappears);
const sideMenuControl = document.getElementById('side-menu');
const approveTrial = document.getElementById('approve-trial')

const contactTable = document.getElementById('contact-information');
const dealTable = document.getElementById("deal-table");
const ticketTable = document.getElementById("ticket-table");

const modalMessage = document.getElementById('modal-message');
const closeDialog = document.getElementById('close-dialog');


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
// document.querySelector('#approve-trial').addEventListener('click', showModal);
// document.querySelector('#close-dialog').addEventListener('click', closeModal);

// document.getElementById('approve-trial').addEventListener('click', function (event) {
approveTrial.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Approve trial pressed");
    console.log("innerHTML value: ", approveTrial.innerHTML)
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
    console.log("Stats pressed");
    modalMessage.innerHTML = "The Stats area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("deals").addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Deals pressed");
    modalMessage.innerHTML = "The Deals area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("tickets").addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Deals pressed");
    modalMessage.innerHTML = "The Tickets area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById("trials").addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Deals pressed");
    modalMessage.innerHTML = "The Trials area is under construction";
    closeDialog.innerHTML = "Cancel";
    showModal(event);
});

document.getElementById('close-dialog').addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Close modal button pressed");
    closeModal(event);
});


function showModal(event) {
    document.getElementById('mask').classList.add('show-mask');
    document.getElementById('alert').classList.add('show-modal');
    console.log("we get this far");
}
function closeModal() {
    document.getElementById('alert').classList.remove('show-modal');
    console.log("we get this far now");
}

const emailForm = document.querySelector("#email-form");
// emailForm.style.display = "none";

const emailFormCapture = document.getElementById('email-form');
const apiFormCapture = document.getElementById('api-form');
// const domApi = document.getElementById('dom-api');
const errorMessage = document.getElementById('error-message');

// const dealTable = document.getElementById("deal-table");
// const rows = document.getElementById("deal-table").rows.length;


emailFormCapture.style.display = "none";
// domApi.style.display = "none";

// var apiValue = "";

// const contactTableName = document.querySelector("#contact-name");

apiFormCapture.addEventListener('submit', function (event) {

    event.preventDefault();

    let apiValue = document.getElementById('api').value;

    errorMessage.innerHTML = "";

    //Placeholder for validation of valid API key//

    console.log(apiValue);
    console.log(apiValue.length);

    if (apiValue.length === 36) {
        emailFormCapture.style.display = "block";
        apiFormCapture.style.display = "none";
        // domApi.innerHTML = apiValue;
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

        let email = document.getElementById('email').value;

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

    // approveTrial.style.backgroundColor = "rgb(252, 143, 77);"

    console.log(data);
    console.log("Message ", data.message);

    const contactId = data.vid;

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

    console.log(contactName);

    contactTable.rows[1].cells[1].innerHTML = contactName;
    contactTable.rows[9].cells[1].innerHTML = email;
    contactTable.rows[6].cells[1].innerHTML = jobTitle;

    const companyId = data.properties.associatedcompanyid.value;

    if (data.properties.associatedcompanyid.value.length > 5) { getCompany(companyId, apiValue, contactId) }
    // console.log(email);
    // console.log(apiValue);
    // console.log(data.properties.associatedcompanyid.value);


    emailFormCapture.reset();

}

async function getCompany(companyId, apiValue, contactId) {

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
    contactTable.rows[5].cells[1].innerHTML = companyId;




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
        getDeals(companyId, apiValue, companyDeals, dealTable, rows, portal, contactId);
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

async function getDeals(companyId, apiValue, companyDeals, dealTable, rows, portal, contactId) {

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

        // if (companyDeals >= data.deals.length) {
        if (data.deals.length > 0) {


            const urlDeals = `https://api.hubapi.com/deals/v1/deal//${dealId}?hapikey=${apiValue}`;

            const response = await fetch(urlDeals);

            const data = await response.json();

            console.log(data);

            var row = dealTable.insertRow(1);

            var dealName = row.insertCell(0);
            var dealStage = row.insertCell(1);
            var amount = row.insertCell(2);
            var closeDate = row.insertCell(3);

            dealName.innerHTML = data.properties.dealname.value;;
            dealStage.innerHTML = data.properties.dealstage.value;
            amount.innerHTML = `$ ${data.properties.amount.value}`;

            let dealCloseDate = new Date(data.properties.closedate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let dealYear = dealCloseDate.getFullYear();
            let dealMonth = months[dealCloseDate.getMonth()];
            let dealDate = dealCloseDate.getDate();

            closeDate.innerHTML = `${dealDate} ${dealMonth} ${dealYear}`
        }


        // if (companyDeals >= data.deals.length) { indivDeals(dealId, apiValue, dealTable, portal, contactId); }
        // // else { getTickets(apiValue, portal); }

        // async function indivDeals(dealId, apiValue, portal) {

        //     // const dealId = data.deals[2]

        //     const urlDeals = `https://api.hubapi.com/deals/v1/deal//${dealId}?hapikey=${apiValue}`;

        //     // https://api.hubapi.com/deals/v1/deal/18479339?hapikey=demo        

        //     const response = await fetch(urlDeals);

        //     const data = await response.json();

        //     console.log(data);
        //     // if (data.deal.isDeleted.value = )
        //     var row = dealTable.insertRow(1);

        //     var dealName = row.insertCell(0);
        //     var dealStage = row.insertCell(1);
        //     var amount = row.insertCell(2);
        //     var closeDate = row.insertCell(3);

        //     dealName.innerHTML = data.properties.dealname.value;;
        //     dealStage.innerHTML = data.properties.dealstage.value;
        //     amount.innerHTML = `$ ${data.properties.amount.value}`;

        //     // const milliseconds = (data.properties.closedate.value * 1);

        //     let dealCloseDate = new Date(data.properties.closedate.value * 1);
        //     let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        //     let dealYear = dealCloseDate.getFullYear();
        //     let dealMonth = months[dealCloseDate.getMonth()];
        //     let dealDate = dealCloseDate.getDate();

        //     console.log("DDMMMYYY ", dealDate, dealMonth, dealYear);


        //     // const dateObject = new Date(milliseconds);
        //     // var year = dateObject.getFullYear();
        //     // console.log("human ", year);
        //     // const humanDateFormat = dateObject.toLocaleString("en-US", { year: "numeric" });
        //     // console.log("human date", humanDateFormat);

        //     closeDate.innerHTML = `${dealDate} ${dealMonth} ${dealYear}`


        //     // console.log(data);
        //     // console.log(companyDeals);
        //     // console.log(data.deals.length);
        // }
        contactTable.rows[7].cells[1].innerHTML = i + 1;
        // getTickets(apiValue, portal);

    }
    // console.log("API & Portal being passed: ", apiValue, portal);

    getTickets(apiValue, contactId);
}

async function getTickets(apiValue, contactId) {

    console.log("Vid = ", contactId);

    // Test code

    const urlTicketObject = `https://api.hubapi.com/crm-associations/v1/associations/${contactId}/HUBSPOT_DEFINED/15?hapikey=${apiValue}`;

    const response = await fetch(urlTicketObject);

    const data = await response.json();

    console.log("All data: ", data);
    console.log("Ticket ID: ", data.results[0]);
    console.log("data.results.length =", data.results.length);

    // const ticketsFound = data.results.length;

    if (data.results.length > 0) {
        contactTable.rows[8].cells[1].innerHTML = data.results.length;
        for (let i = 0; i < data.results.length; i++) {

            const urlTickets = `https://api.hubapi.com/crm-objects/v1/objects/tickets/${data.results[i]}?hapikey=${apiValue}&properties=subject&properties=content&properties=hs_pipeline_stage&properties=createdate&properties=closedate`;

            const response = await fetch(urlTickets);

            const output = await response.json();

            console.log(output);

            var row = ticketTable.insertRow(1);

            var ticketName = row.insertCell(0);
            var ticketContent = row.insertCell(1);
            var ticketStatus = row.insertCell(2);
            var ticketCreateDate = row.insertCell(3);

            ticketName.innerHTML = output.properties.subject.value;
            ticketContent.innerHTML = output.properties.content.value;

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


            let ticketOpenDate = new Date(output.properties.createdate.value * 1);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let ticketYear = ticketOpenDate.getFullYear();
            let ticketMonth = months[ticketOpenDate.getMonth()];
            let ticketDate = ticketOpenDate.getDate();

            console.log("DDMMMYYY ", ticketDate, ticketMonth, ticketYear);
            ticketCreateDate.innerHTML = `${ticketDate} ${ticketMonth} ${ticketYear}`

        }
    }



    // end test code


    // const urlTicket = `https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=${apiValue}&properties=subject&properties=content&properties=hs_pipeline_stage&properties=createdate&properties=closedate`;

    // https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=demo&properties=subject&properties=content&properties=hs_pipeline&properties=hs_pipeline_stage

    // Original code 
    // const response = await fetch(urlTicket);

    // const data = await response.json();

    // console.log(data);

    // console.log(data.objects.length);

    // let ticketCount = 0;

    // for (let i = 0; i < data.objects.length; i++) {
    //     console.log("From array ", data.objects[i].portalId);
    //     console.log("Portal ", portal)
    //     if (portal === data.objects[i].portalId) {
    //         ticketCount = ticketCount + 1;

    //         // console.log("Data from portal query loop ", data.objects[i], 0);

    //         console.log(ticketCount);

    //         var row = ticketTable.insertRow(1);

    //         var ticketName = row.insertCell(0);
    //         var ticketContent = row.insertCell(1);
    //         var ticketStatus = row.insertCell(2);
    //         var ticketCreateDate = row.insertCell(3);

    //         ticketName.innerHTML = data.objects[i].properties.subject.value;
    //         ticketContent.innerHTML = data.objects[i].properties.content.value;

    //         if (data.objects[i].properties.hs_pipeline_stage.value == '1') {
    //             ticketStatus.innerHTML = "New"
    //         }
    //         else if (data.objects[i].properties.hs_pipeline_stage.value == '2') {
    //             ticketStatus.innerHTML = "Waiting on contact"
    //         }
    //         else if (data.objects[i].properties.hs_pipeline_stage.value == '3') {
    //             ticketStatus.innerHTML = "Waiting on us"
    //         }
    //         else if (data.objects[i].properties.hs_pipeline_stage.value == '4') {
    //             ticketStatus.innerHTML = "Closed"
    //         }


    //         let ticketOpenDate = new Date(data.objects[i].properties.createdate.value * 1);
    //         let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //         let ticketYear = ticketOpenDate.getFullYear();
    //         let ticketMonth = months[ticketOpenDate.getMonth()];
    //         let ticketDate = ticketOpenDate.getDate();

    //         console.log("DDMMMYYY ", ticketDate, ticketMonth, ticketYear);
    //         ticketCreateDate.innerHTML = `${ticketDate} ${ticketMonth} ${ticketYear}`
    //     }
    //     contactTable.rows[8].cells[1].innerHTML = ticketCount;


    // }




    // https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=demo&properties=subject&properties=content&properties=hs_pipeline&properties=hs_pipeline_stage

    // addFreeTrial(apiValue, contactId);

}

// async function addFreeTrial(apiValue, contactId) {
//     console.log("Hi - free trials area");
//     console.log("Vid = ", contactId);

//     // const email = joe.r.roche.com;


//     const urlFreeTrial = `https://api.hubapi.com/contacts/v1/contact/${contactId}/2340324/profile?hapikey=${apiValue}`;

//     const response = await fetch(urlFreeTrial, {
//         method: 'POST',
//         body: JSON.stringify({
//             free_trial__y_n_: "Y",
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             console.log(data)
//             // title=document.getElementById("title")
//             // body=document.getElementById("bd")
//             // title.innerHTML = data.title
//             // body.innerHTML = data.body  
//         }).catch(error => console.error('Error:', error));
// };

    // https://api.hubapi.com/contacts/v1/contact/vid/2340324/profile?hapikey=demo



