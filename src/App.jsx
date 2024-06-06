import { useState } from 'react';
import './App.css';

function App() {
  const [juegoId, setJuegoId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchValoraciones = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/valoracion/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ juegoId: parseInt(juegoId) }),
      });
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError('Error fetching data');
      setData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchValoraciones();
  };

  return (
    <div>
      <h1>Vite + React</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Juego ID:
          <input
            type="text"
            value={juegoId}
            onChange={(e) => setJuegoId(e.target.value)}
          />
        </label>
        <button type="submit">Buscar Valoraciones</button>
      </form>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Promedio: {data.promedio}</h2>
          <h3>Cantidad de Valoraciones: {data.cantidad_valoraciones}</h3>
          <div className="valoraciones">
            {data.valoraciones.map((valoracion, index) => (
              <div key={index} className="valoracion-card">
                <p><strong>Fecha:</strong> {valoracion.fecha}</p>
                <p><strong>Valoración:</strong> {valoracion.valoracion}</p>
                <p><strong>Comentario:</strong> {valoracion.comentario}</p>
                <p><strong>Nombre:</strong> {valoracion.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
