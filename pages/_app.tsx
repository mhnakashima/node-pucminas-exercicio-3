import { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import PrivateContext from '../application/PrivateContext';
import '../styles/globals.scss';

type TPageProps = {
  [name: string]: any;
};

interface INodeAppProps extends AppProps {
  environment: Record<string, string>;
  Component: React.FunctionComponent;
  apiUrl: string;
  pageProps: TPageProps;
  baseUrl: string;
}

const CustomApp = ({ Component, pageProps, apiUrl, baseUrl, environment }: INodeAppProps) => {
  const { ...restPageProps } = pageProps;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const renderApplicationContent = () => {
    return (
      <PrivateContext>
        <Component {...restPageProps} />
      </PrivateContext>
    );
  };

  return (
    renderApplicationContent()
  )
}

CustomApp.getInitialProps = async () => {
  return {
    environment: {
      API_URL: process.env.API_URL,
    },
    baseUrl: process.env.BASE_PATH || '',
  };
};

export default CustomApp;
