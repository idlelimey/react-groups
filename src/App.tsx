import { lazy, Suspense, useEffect, useState } from 'react';
import { appData } from './data/appData';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import Welcome from './components/Welcome';
import { useAtomValue } from 'jotai';
import { themeAtom } from './store/atoms';

const Layout = lazy(() => import('./components/Layout'));
const GroupMap = lazy(() => import('./components/Map'));

function App() {
    const [loadMap, setLoadMap] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const theme = useAtomValue(themeAtom);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <Suspense fallback={<Loading />}>
            <ErrorBoundary>
                <Welcome setShowWelcome={setShowWelcome} />
                {loadMap && (
                    <GroupMap
                        lat={appData.venue.lat}
                        lng={appData.venue.lng}
                        name={appData.venue.name}
                        address={appData.venue.address}
                    />
                )}
                <Layout
                    onMount={() => setLoadMap(true)}
                    showWelcome={showWelcome}
                />
            </ErrorBoundary>
        </Suspense>
    );
}

export default App;
