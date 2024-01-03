import CommunityHeader from './CommunityHeader';
import { CommunityProvider } from './CommunityContext';
import './style.css';

export default function CommunityLayout({ children }) {
  return (
    <div style={{height: '90%'}}>
      <CommunityProvider>
        <CommunityHeader />
        {children}
      </CommunityProvider>
    </div>
  );
}
