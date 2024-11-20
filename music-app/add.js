const API_URL = "http://localhost:3000/music";
document.getElementById("addSingerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const artistName = document.getElementById("artistName").value;
    const nationality = document.getElementById("nationality").value;
    const coverArt = document.getElementById("coverArt").value;
    const age = document.getElementById("age").value;


    if (!title || !artistName || !nationality || !coverArt || !age) {
        Swal.fire('Error', 'All fields are required!', 'error');
        return;
    }

    const newSinger = {
        title,
        artistName,
        nationality,
        coverArt,
        age: parseInt(age),
    };


    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSinger),
        });

        if (response.ok) {
            Swal.fire('Success', 'Singer added successfully!', 'success');
            document.getElementById("addSingerForm").reset();
        } else {
            Swal.fire('Error', 'Something went wrong, please try again!', 'error');
        }
    } catch (error) {
        console.error('Error adding singer:', error);
        Swal.fire('Error', 'Failed to connect to the server.', 'error');
    }
});