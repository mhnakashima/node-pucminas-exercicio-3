import { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import App, { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.scss'

type TPageProps = {
  isPublic?: boolean;
  [name: string]: any;
};

interface INodeAppProps extends AppProps {
  environment: Record<string, string>;
  Component: React.FunctionComponent;
  apiUrl: string;
  session: Session;
  pageProps: TPageProps;
  baseUrl: string;
}

function MyApp({ Component, pageProps, environment, session }: INodeAppProps) {
  const { isPublic, ...restPageProps } = pageProps;
  const environmentScriptObject = {
    __html: `window.env=${JSON.stringify(environment)}`,
  };

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const renderApplicationContent = () => {
    return (
      <Component {...restPageProps} />
    );
  };

  return (
    <SessionProvider session={session}>
      {renderApplicationContent()}
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext);
  const session = await getSession({ req: appContext.ctx.req });

  return {
    ...props,
    session,
    environment: {
      API_URL: process.env.API_URL,
    },
    baseUrl: process.env.BASE_PATH || '',
  };
};

export default MyApp
