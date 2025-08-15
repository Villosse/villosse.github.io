import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Home = () => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Welcome</h2>
                <p>Portfolio content coming soon...</p>
            </section>
        </main>
        <Footer />
    </div>
)