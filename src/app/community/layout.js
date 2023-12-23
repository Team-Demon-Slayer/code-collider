import CommunityHeader from "./CommunityHeader";

export default function CommunityLayout({ children }) {
  return (
<div>
  <CommunityHeader />
  {children}
</div>
  );
}