import { Toaster } from '~/core/ui/toaster';
import Footer from './components/Footer';
import SiteHeaderSessionProvider from './components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';

async function SiteLayout(props: React.PropsWithChildren) {
  const data = await loadUserData();

  return (
    <>
      {/* <SiteHeaderSessionProvider data={data.session} /> */}

      {props.children}
      <Toaster />

      {/* <Footer /> */}
    </>
  );
}

export default SiteLayout;
