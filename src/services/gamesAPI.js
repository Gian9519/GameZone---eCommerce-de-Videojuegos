const API_KEY = '41d36e4ceece409ca3e8d65e8e752729'; 
const BASE_URL = 'https://api.rawg.io/api/games';

export const fetchGames = async (pageSize = 12, search = '', page = 1) => {
  try {
    let url = `${BASE_URL}?key=${API_KEY}&page_size=${pageSize}&page=${page}`;
    
    // Si hay un término de búsqueda, añadirlo a la URL
    if (search.trim() !== '') {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return getBackupGames();
  }
};

// Juegos de respaldo (adaptados de tu código original)
const getBackupGames = () => {
  return [
    {
      id: 5100,
      name: "The Witcher 3: Wild Hunt",
      background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png",
      platforms: [
        { platform: { name: "PlayStation 4" } },
        { platform: { name: "Xbox One" } },
        { platform: { name: "PC" } }
      ]
    },
    {
      id: 1890,
      name: "Elden Ring",
      background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1w0w.png",
      platforms: [
        { platform: { name: "PlayStation 5" } },
        { platform: { name: "Xbox Series X|S" } },
        { platform: { name: "PC" } }
      ]
    },
    {
      id: 2452,
      name: "Red Dead Redemption 2",
      background_image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.png",
      platforms: [
        { platform: { name: "PlayStation 4" } },
        { platform: { name: "Xbox One" } },
        { platform: { name: "PC" } }
      ]
    }
  ];
};