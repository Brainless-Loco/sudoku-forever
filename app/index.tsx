import { useEffect } from 'react';
// Source - https://stackoverflow.com/a/77357334
// Posted by Mohammad Reza
// Retrieved 2026-06-11, License - CC BY-SA 4.0

import { useRootNavigationState, Redirect } from 'expo-router';

export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={'/screens/LogIn'} />
}
