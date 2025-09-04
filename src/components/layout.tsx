import type { PropsWithChildren } from 'react';
import Header from './header';

const Layout = ({ children }: PropsWithChildren) => {
    return (
            <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background to-muted">
                <Header />
                <main className="flex-1 w-full px-4 py-8">
                    {children}
                </main>
                <footer className="w-full border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                    <div className="w-full text-center text-gray-400">
                        <p>
                            Made with ❤️ by Tuấn Anh
                        </p>
                    </div>
                </footer>
            </div>
    );
};

export default Layout;
