function sendEmail() {
    const name = document.getElementById("your-name").value;
    const email = document.getElementById("your-email").value;
    const phoneNumber = document.getElementById("your-phone-number").value;
    const purpose = document.getElementById("your-purpose").value;
    const service = document.getElementById("your-service").value;
    const image = document.getElementById("your-image").value;
    const message = document.getElementById("your-message").vaule

    // Perform basic validation
    if (name === "" || email === "" || phoneNumber === "" || purpose === "" || service === "") {
        alert("Please fill out all fields");
        return;
    }

    const serviceID = "service_kuv4hvp";
    const templateID = "service_kuv4hvp";


    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        if (image !== "" & message !== ""){
        document.getElementById("your-name").value = "";
        document.getElementById("your-email").value = "";
        document.getElementById("your-phone-number").value = "";
        document.getElementById("your-purpose").value = "";
        document.getElementById("your-service").value = "";
        document.getElementById("your-image").value = "";
        document.getElementById("your-message").vaule = "";
        }
        else if (image === "" & message !== "") {
            document.getElementById("your-name").value = "";
            document.getElementById("your-email").value = "";
            document.getElementById("your-phone-number").value = "";
            document.getElementById("your-purpose").value = "";
            document.getElementById("your-service").value = "";
            document.getElementById("your-message").vaule = "";
        }
        else if (image !== "" & message === "") {
            document.getElementById("your-name").value = "";
            document.getElementById("your-email").value = "";
            document.getElementById("your-phone-number").value = "";
            document.getElementById("your-purpose").value = "";
            document.getElementById("your-service").value = "";
            document.getElementById("your-image").value = "";
        }
        else {
            document.getElementById("your-name").value = "";
            document.getElementById("your-email").value = "";
            document.getElementById("your-phone-number").value = "";
            document.getElementById("your-purpose").value = "";
            document.getElementById("your-service").value = "";
        }

        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch((error) => {
            console.error('Error:', error);
            alert("Error sending email. Please try again later.");
        });
     // Use fetch to send form data to server
    //  fetch('/get-a-quote', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `name=${name}&email=${email}&phoneNumber=${phoneNumber}&purpose=${purpose}&image${image}&message=${message}`,
    // })
    // .then(response => response.text())
    // .then(data => {
    //     console.log(data);
    //     alert(data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     alert("Error sending email. Please try again later.");
    // });
}
