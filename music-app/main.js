let data = [];

const API_URL = "http://localhost:3000/music";


async function fetchAndRender() {
  try {
    const response = await fetch(API_URL);
    data = await response.json();
    populateFilterOptions();
    renderCards(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


function renderCards(data) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
          <div class="col">
            <div class="card">
              <img src="${item.coverArt}" class="card-img-top" alt="${item.title}">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p>${item.artistName}</p>
                <p>${item.nationality}</p>
                <button class="btn btn-danger" onclick="deleteSinger(${item.id})">Delete</button>
                <a href="edit.html?id=${item.id}" class="btn btn-edit">Edit</a>
              </div>
            </div>
          </div>`;
  });
}

// Populate country filter options
function populateFilterOptions() {
  const countries = [...new Set(data.map(item => item.nationality))];
  const filterCountry = document.getElementById("filter-country");
  filterCountry.innerHTML = `<option value="" selected>Country</option>`;
  countries.forEach(country => {
    filterCountry.innerHTML += `<option value="${country}">${country}</option>`;
  });
}


document.getElementById("search-input").addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(value) ||
    item.artistName.toLowerCase().includes(value)
  );
  renderCards(filteredData);
});


document.getElementById("sort-age").addEventListener("change", function (e) {
  const order = e.target.value;
  const sortedData = [...data].sort((a, b) =>
    order === "asc" ? a.age - b.age : b.age - a.age
  );
  renderCards(sortedData);
});


document.getElementById("filter-country").addEventListener("change", function (e) {
  const country = e.target.value;
  const filteredData = country ? data.filter(item => item.nationality === country) : data;
  renderCards(filteredData);
});


async function deleteSinger(id) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      Swal.fire('Deleted!', 'The singer has been deleted.', 'success');
      fetchAndRender();
    } catch (error) {
      console.error("Error deleting singer:", error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
}

fetchAndRender();
