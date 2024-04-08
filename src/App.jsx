
import React, { useState } from "react";
import "./App.css"; // Asegúrate de importar el archivo CSS que contiene los estilos

function App() {
  const [cancion, setCancion] = useState('');
  const [canciones, setCanciones] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    if (cancion.trim() === '') {
      alert('Debes ingresar algo');
      return;
    }
    console.log(cancion);
    setCancion('');
    await getSong(cancion);
  }

  async function getSong(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=30&numberOfTopResults=5`;

      let data = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd07e346c4emsh6bd6d4641050e1ep1de49ajsnb28201ea822a',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      });
      let res = await data.json();
      setCanciones(res.tracks.items);
    } catch (error) {
      console.log(`ups.. error: ${error}`);
    }
  }

  return (
    <div className="container">
      <h2>Busca tu musica Favorita🌟</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={cancion} onChange={e => setCancion(e.target.value)} />
        <button type="submit">Buscar🕵🏼</button>
      </form>
      <div className="track-container">
        {canciones.map((cancion, index) => (
          <div className="track" key={index}>
            <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt="" />
            <div className="track-info">
              <h2>{cancion.data.name}</h2>
              <iframe
                src={`https://open.spotify.com/embed/track/${cancion.data.id}`}
                width="300"
                height="80"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

