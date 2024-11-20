
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const contactData = {
            name: name,
            email: email,
            message: message
        };

        fetch('http://localhost:3000/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        })
            .then(response => response.json())
            .then(data => {
                // Display a success message
                document.getElementById('response').innerHTML = `
                    <div class="alert alert-success" role="alert">
                        Thank you, ${data.name}. Your message has been received. We'll get back to you shortly.
                    </div>
                `;

                document.getElementById('contact-form').reset();
            })
            .catch(error => {
                console.error("Error:", error);

                document.getElementById('response').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Something went wrong. Please try again later.
                    </div>
                `;
            });
    } else {

        document.getElementById('response').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Please fill out all fields.
            </div>
        `;
    }
});