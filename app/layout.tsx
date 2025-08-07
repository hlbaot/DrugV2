import '../public/logo.png';
import '../styles/global.css';
import { UserProvider } from '@/context/UserContext';

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
        </UserProvider>
      </body>
    </html>
  );
}
