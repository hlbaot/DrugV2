import '@/src/styles/global.css';
import { ThemeProvider } from "@/src/components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import { StoreInitializer } from '@/src/store/StoreInitializer';
import { QueryProvider } from '@/src/components/QueryProvider';

export const metadata = {
  title: 'DrugConnectionV2',
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <StoreInitializer>
            <ThemeProvider>
              {children}
              <ToastContainer position="top-right" />
            </ThemeProvider>
          </StoreInitializer>
        </QueryProvider>
      </body>
    </html>
  );
}
