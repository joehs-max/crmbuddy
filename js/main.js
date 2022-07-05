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

// const contactTableName = document.querySelector("#contact-name");

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

            const contactName = `${data.properties.firstname.value} ${data.properties.lastname.value}`

            // const milliseconds = 1575909015 * 1000 // 1575909015000

            // const dateObject = data.properties.createdate.value * 1000;

            // console.log(dateObject);

            // const humanDateFormat = dateObject.toLocaleString("en-US", { year: "numeric" });

            // console.log(humanDateFormat);


            // const createDate = data.properties.createdate.value

            console.log(contactName);

            var contactTable = document.getElementById('contact-information');

            contactTable.rows[1].cells[1].innerHTML = contactName;

            if (data.properties.associatedcompanyid.value.length > 5) { getCompany(data.properties.associatedcompanyid.value) }
            console.log(email);
            console.log(apiValue);
            console.log(data.properties.associatedcompanyid.value);

            var companyId = data.properties.associatedcompanyid.value;


            async function getCompany(companyId) {

                // const companyId = data.properties.associatedcompanyid.value;

                const urlCompany = `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${apiValue}`;

                const response = await fetch(urlCompany);

                const data = await response.json();

                console.log(data);

                const companyName = data.properties.name.value;
                const companyAddress = `${data.properties.city.value}, ${data.properties.country.value}`;
                const companyDeals = data.properties.hs_num_open_deals.value;
                const industry = data.properties.industry.value;
                const portal = data.portalid;

                contactTable.rows[2].cells[1].innerHTML = companyName;
                contactTable.rows[3].cells[1].innerHTML = companyAddress;
                contactTable.rows[4].cells[1].innerHTML = industry;
                contactTable.rows[7].cells[1].innerHTML = companyDeals;
                contactTable.rows[5].cells[1].innerHTML = portal;


                if (companyDeals > 0) { getDeals(companyId) }
                console.log(email);
                console.log(apiValue);


                async function getDeals(companyId) {

                    // const companyId = data.properties.associatedcompanyid.value;

                    const urlDeals = `https://api.hubapi.com/deals/v1/deal/associated/company/${companyId}/paged?hapikey=${apiValue}&includeAssociations=true&limit=10&properties=dealname`;

                    // `https://api.hubapi.com/deals/v1/deal/associated/company/${companyId}/paged?hapikey=${apiValue}&includeAssociations=true&limit=10&properties=dealname`

                    const response = await fetch(urlDeals);

                    const data = await response.json();

                    console.log(data);
                    console.log(companyDeals);
                    console.log(data.deals.length);

                    const dealId = data.deals[0].dealId;
                    console.log(dealId);

                    var dealTable = document.getElementById("deal-table");
                    var rows = document.getElementById("deal-table").rows.length;

                    console.log(`Rows ${rows}`);


                    for (let i = 0; i < data.deals.length; i++) {
                        let dealId = data.deals[i].dealId;

                        console.log(`i=${i} and dealid=${dealId}`);
                        console.log(`companyDeals=${companyDeals} and data.deal.length=${data.deals.length}`)


                        if (companyDeals >= data.deals.length) { indivDeals(dealId) }

                        async function indivDeals(dealId) {

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
                            amount.innerHTML = data.properties.amount.value;
                            closeDate.innerHTML = data.properties.closedate.value;


                            // console.log(data);
                            // console.log(companyDeals);
                            // console.log(data.deals.length);
                        }
                        contactTable.rows[7].cells[1].innerHTML = i + 1;

                    }

                }
                async function getTickets(companyId) {

                }

            }


        }

        emailFormCapture.reset();

    });


});





