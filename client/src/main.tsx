import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { DataProvider } from './context/DataContext.tsx';
import { PaginationProvider } from './context/PaginationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <PaginationProvider>
          {' '}
          <App />
        </PaginationProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);
