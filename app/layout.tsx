import '../public/logo.png';
import '../styles/global.css';
// import { SocketProvider } from '@/context/SocketContext';

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
        {/* <SocketProvider> */}
          {children}
        {/* </SocketProvider> */}
      </body>
    </html>
  );
}
