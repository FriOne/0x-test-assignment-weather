import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './style.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
