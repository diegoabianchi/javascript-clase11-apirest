const baseUrl = "https://rickandmortyapi.com/api/character";
const results = document.getElementById("results");
const getAllBtn = document.getElementById("getAllBtn");
const filterForm = document.getElementById("filterForm");

async function fetchCharacters(url) {
  results.innerHTML = "Cargando...";
  try {
    const response = await fetch(url);
    if (!response.ok){
        throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    displayCharacters(data.results);
  } catch (error) {
    results.innerHTML = `<p class="error">No se pudo obtener la información. ${error.message}</p>`;
  }
}

function displayCharacters(characters) {
  if (!characters || characters.length === 0) {
    results.innerHTML = "<p>No se encontraron personajes.</p>";
    return;
  }

  results.innerHTML = characters
    .map(
      (char) => `
      <div class="card">
        <img src="${char.image}" alt="${char.name}">
        <h3>${char.name}</h3>
        <p><strong>Estado:</strong> ${char.status}</p>
        <p><strong>Especie:</strong> ${char.species}</p>
        <p><strong>Género:</strong> ${char.gender}</p>
      </div>
    `
    )
    .join("");
}

getAllBtn.addEventListener("click", () => {
  fetchCharacters(baseUrl);
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("status").value.trim();
  const species = document.getElementById("species").value.trim();
  const type = document.getElementById("type").value.trim();
  const gender = document.getElementById("gender").value.trim();

  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (status) params.append("status", status);
  if (species) params.append("species", species);
  if (type) params.append("type", type);
  if (gender) params.append("gender", gender);

  const url = `${baseUrl}/?${params.toString()}`;
  fetchCharacters(url);
});
