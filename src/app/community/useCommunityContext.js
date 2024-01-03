'use client';

import { useContext } from 'react';
import { CommunityContext } from './CommunityContext';

export default function useCommunityContext() {
  return useContext(CommunityContext);
}
