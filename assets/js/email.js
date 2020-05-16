function submitForm(contactForm) {
    initEmailJS();
    emailjs.send("gmail", "cairngormsOutdoorsContact", {
        "custName": contactForm.custName.value,
        "custNumber": contactForm.custNumber.value,
        "custEmail": contactForm.custEmail.value,
        "custMsg": contactForm.custMsg.value
    })
    .then( 
        function(response) {
            console.log("FORM SENT", response);
        },  
        function(error) {
            console.log("ERROR: FORM NOT SENT", error);
        }
    );
    return false;  
}

function initEmailJS() {
    emailjs.init("user_AAsZLnhAZieILowz83fRw");
};