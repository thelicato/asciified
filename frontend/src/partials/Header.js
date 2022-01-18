import Logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="container mx-auto py-6">
            <img src={Logo} alt="asciified" className="mx-auto"/>
        </header>
    )
}

export default Header;