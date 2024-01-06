import CommunityHeader from './CommunityHeader';
import { CommunityProvider } from './CommunityContext';
import { Toaster } from 'react-hot-toast';
import './style.css';

export default function CommunityLayout({ children }) {
  return (
    <div className="community-container">
      <CommunityProvider>
        <CommunityHeader />
        {children}
        <Toaster toastOptions={{
          style: {
            marginTop: '6rem',
            zIndex: 9999,
          }
        }} />
      </CommunityProvider>
    </div>
  );
}
