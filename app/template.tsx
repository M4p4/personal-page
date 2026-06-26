'use client';

import { PageTransition } from 'components/ui/PageTransition';
import { ReactNode } from 'react';

// template.tsx re-mounts on every navigation, which replays the enter animation
// that the Pages Router version drove via AnimatePresence + router.route keying.
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
