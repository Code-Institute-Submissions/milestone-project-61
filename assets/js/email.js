function submitForm(contactForm) {
    initEmailJS();
    emailjs.send("gmail", "cairngormsOutdoorsContact", {
        "custName": contactForm.custName.value,
        "custNumber": contactForm.custNumber.value,
        "custEmail": contactForm.custEmail.value,
        "custMsg": contactForm.custMsg.value
    })
    return false;  
}

function initEmailJS() {
    emailjs.init("user_AAsZLnhAZieILowz83fRw");
};