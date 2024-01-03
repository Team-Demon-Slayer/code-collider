import CommunityHeader from './CommunityHeader';
import { CommunityProvider } from './CommunityContext';
import './style.css';

export default function CommunityLayout({ children }) {
  return (
    <div className="community-container">
      <CommunityProvider>
        <CommunityHeader />
        {children}
      </CommunityProvider>
    </div>
  );
}
