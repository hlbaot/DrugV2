import '@/src/styles/global.css';
import { ThemeProvider } from "./ThemeProvider";
import { ToastContainer } from "react-toastify";
import { UserProvider } from '@/src/context/UserContext';

export const metadata = {
  title: 'DrugConnectionV2',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <ThemeProvider>
            {children}
            <ToastContainer position="top-right" />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
