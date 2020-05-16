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
            $("#emailJS-success").show();
            $("#contact-form").hide();
        },   
        function(error) {
            console.log("ERROR: FORM NOT SENT", error);
            $("#emailJS-error").show();
            $("#contact-form").hide(); 
        }
    );
    return false;  
}

function initEmailJS() {
    emailjs.init("user_AAsZLnhAZieILowz83fRw");
};