import CommunityHeader from './CommunityHeader';
import { CommunityProvider } from './CommunityContext';

export default function CommunityLayout({ children }) {
  return (
    <div>
      <CommunityProvider>
        <CommunityHeader />
        {children}
      </CommunityProvider>
    </div>
  );
}
