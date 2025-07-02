import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PointsProvider, QuizProvider, RoomCodeProvider, SelectedOptionProvider } from './context/index.tsx';

createRoot(document.getElementById('root')!).render(
  //   <StrictMode>

  //   </StrictMode>,
  <PointsProvider>
    <SelectedOptionProvider>
      <QuizProvider>
        <RoomCodeProvider>
          <App />
        </RoomCodeProvider>
      </QuizProvider>
    </SelectedOptionProvider>
  </PointsProvider>
);
