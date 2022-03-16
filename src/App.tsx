import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { GenreResponseProps } from './interfaces/GenreResponseProps';
import { api } from './services/api';
import './styles/content.scss';
import './styles/global.scss';
import './styles/sidebar.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectedGenreId={selectedGenreId} handleClickButton={handleClickButton} />
      <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />      
    </div>
  )
}