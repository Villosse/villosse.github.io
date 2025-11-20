import { config } from '../../config';

export const Header = () => {
    return (
        <header className="py-6">
            <div className="container text-center">
                <h1 className="text-4xl font-bold">{config.personal.name}</h1>
                <img
                    src={config.personal.image}
                    alt={`${config.personal.name}'s profile`}
                    className="profile-image"
                />
            </div>
        </header>
    );
};