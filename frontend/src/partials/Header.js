import Logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="w-4/5 md:w-full md:container mx-auto py-6">
            <img src={Logo} alt="asciified" className="mx-auto"/>
        </header>
    )
}

export default Header;