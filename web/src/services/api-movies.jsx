// login

const getMoviesFromApi = ({ genre, sort }) => {
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC -> GET
  return fetch(`http://localhost:4000/movies?genre=${genre}&sort=${sort}`)
    .then(response => response.json())
    .then((data) => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data.movies;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
