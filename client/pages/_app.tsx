import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { storeWrapper } from '@/store';
import MainLayout from '@/layouts/MainLayout';

const MyApp: React.FC<AppProps> = ({ Component, ...restProps }: AppProps) => {
  const { store, props } = storeWrapper.useWrappedStore(restProps);
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...props.pageProps} />
      </MainLayout>
    </Provider>
  );
};

export default MyApp;
