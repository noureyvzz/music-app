const API_URL = "http://localhost:3000/music";
async function fetchSingerData(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const singer = await response.json();
        if (singer) {
            document.getElementById("singer-id").value = singer.id;
            document.getElementById("title").value = singer.title;
            document.getElementById("artist-name").value = singer.artistName;
            document.getElementById("nationality").value = singer.nationality;
            document.getElementById("cover-art").value = singer.coverArt;
        }
    } catch (error) {
        console.error("Error fetching singer data:", error);
    }
}
document.getElementById("edit-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const id = document.getElementById("singer-id").value;
    const updatedSinger = {
        title: document.getElementById("title").value,
        artistName: document.getElementById("artist-name").value,
        nationality: document.getElementById("nationality").value,
        coverArt: document.getElementById("cover-art").value,
    };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSinger),
        });
        Swal.fire("Success", "Singer updated successfully", "success").then(() => {
            window.location.href = "index.html";
        });
    } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
    }
});
const params = new URLSearchParams(window.location.search);
const singerId = params.get("id");
if (singerId) fetchSingerData(singerId);