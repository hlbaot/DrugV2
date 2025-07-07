import '../public/logo.png';
import '../styles/global.scss';
export const metadata = {
  title: 'DrugConnectionV2', // tiêu đề
  icons: {
    icon: 'logo.png', // logo
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
