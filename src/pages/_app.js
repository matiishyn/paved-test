import 'bootstrap/dist/css/bootstrap.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import '../../styles/globals.css';
import { ToastProvider } from 'react-toast-notifications';
import { AdDataProvider } from '../hooks/adDataContext';
import { FontDataProvider } from '../hooks/fontDataContext';

function AdUnitBuilderApp({ Component, pageProps }) {
  return (
    <AdDataProvider>
      <FontDataProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </FontDataProvider>
    </AdDataProvider>
  );
}

export default AdUnitBuilderApp;
