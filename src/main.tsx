import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { FavoritesProvider } from './FavoritesContext/FavoritesContext';

createRoot(document.getElementById('root')!).render(
    <FavoritesProvider>
        <App />
    </FavoritesProvider>
)
