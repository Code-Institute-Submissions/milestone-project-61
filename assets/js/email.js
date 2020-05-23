function submitForm(contactForm) {
    initEmailJS();
    //pass user inputs to EmailJS
    emailjs.send("gmail", "cairngormsOutdoorsContact", {
        "custName": contactForm.custName.value,
        "custNumber": contactForm.custNumber.value,
        "custEmail": contactForm.custEmail.value,
        "custMsg": contactForm.custMsg.value
    }) 
    //log an success/error message to console and display success/error feedback to user
    .then( 
        function(response) {
            //form success
            console.log("FORM SENT", response);
            $("#emailJS-success").show();
            $("#form-container").hide();
        },   
        function(error) {
            //form error
            console.log("ERROR: FORM NOT SENT", error);
            $("#emailJS-error").show();
            $("#form-container").hide(); 
        }
    );
    return false;  
}

function initEmailJS() {
    emailjs.init("user_AAsZLnhAZieILowz83fRw");
}
