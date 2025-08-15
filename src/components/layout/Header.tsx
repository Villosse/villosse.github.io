import type { PortfolioConfig } from "@/config/schema";
import config from '@/config';

const portfolioData = config.load();

export const Header = () => {
    <header className="py-6">
        <div className="container text-center">
            <h1 className="text-4xl font-bold">{config.name}</h1>
            <img
                src={portfolioData.image}
                alt={`${portfolioData.name}'s profile`}
                className="profile-image"
            />
        </div>
    </header>
}