import '@/src/styles/global.css';
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
          {children}
          <ToastContainer position="top-right" />
        </UserProvider>
      </body>
    </html>
  );
}
