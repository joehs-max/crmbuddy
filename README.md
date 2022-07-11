# crmbuddy
 GA FEWD Project

 PURPOSE / USE-CASE
 ==================
 Prototype a web app to enable a user to create a dashboard for contact level information extracted from their HubSpot CRM based on provision of an API key and a contact email address and using this information as decision support for downstream decisions. 

 APPROACH
 ========
 With the structure and appearance defined in HTML & CSS, JS is relied upon to manipulate the UI, capture the required data inputs, and present information onscreen. 

 LOGICAL FLOW
 ============
 To ensure security, the API key is required to be entered (for each session) by the user and is not built-in to the app.
 When an email is entered (in addition to a valid API), the following API calls are made;
 - Contact API: validate presence of contact in CRM
 - Company API: to populate further contact information
 - Deals API: to capture deal Ids and then iterate through each for details
 - Associations API: to identify any associated tickets
 - Tickets API: to iterate through each for details

 FUNCTIONAL NOTES
 ================
 All nav buttons in views greater than 800px width trigger a modal with an button specific "under construction" message (The reset API button has a defaul action of refreshing the screen thus necessitating re-entry of an API Key)
 The Approve trial button is similarly constructed but the messaging is altered depending on the existance of a valid email address.
 All of these nav buttons trigger the same modal/mask with differing messaging based on context.
 For smaller screen sizes, the hamburger menu options are inactive.

 KNOWN GAPS
 ==========
 While all API calls (other than Contact) are conditional on the presence of data, if a data.value, required for table population, does not exist within a valid data record [e.g. Job Title], the process will end unexpectedly and ignore subsequent actions.  
