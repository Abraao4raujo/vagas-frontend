import {
    HeaderWrapper,
    ProfileImg,
    UserArea,
    Name,
    Email,
    OpenMenuBtn,
    HeaderLogo,
    UserInfo,
    LoginBtn,
} from './styles';
import Menu from '../Menu';
import LogoImage from '../../../assets/imgs/logotipo-icone-extendida.svg';
import MenuImage from '../../../assets/imgs/vertical-menu.svg';
import ProfileImage from '../../../assets/imgs/profile-image.svg';
import { BiMenu } from "react-icons/bi";
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {
    const auth: any = useContext(AuthContext);
    const navigate = useNavigate();

    //TODO: Ao utilizar esse componente header, temos uma aninhamento de redirecionamento
    // ao clicar no link que redireciona para a pagina atual, sobrepondo vários redirecionamentos
    // const handleNavigation = () => {
    //     navigate('/profile-settings');
    // };

    const handleClick = () => {
        if (auth.user) {
            setVisible(!visible);
        } else {
            navigate('/login');
        }
    };

    const [visible, setVisible] = useState(false);

    return (
        <>
            <HeaderWrapper>
                    
                {/* Menu adicionado pelo icon */}
                <BiMenu
                onClick={handleClick}
                className='text-5xl cursor-pointer text-white'
                />

                <div>
                    <HeaderLogo
                        src={LogoImage}
                        width="194px"
                        height="29px"
                        alt="logo"
                    />
                </div>
                    
                <UserArea>

                    <span>
                        {auth.user ? (
                            <UserInfo>
                                {auth.user.type === 'USER' ? (
                                    <Name>{auth.user.name}</Name>
                                ) : (
                                    <Name>{auth.user.companyName}</Name>
                                )}
                                <Email>{auth.user.email}</Email>
                            </UserInfo>
                        ) : (
                            <LoginBtn onClick={handleClick}>
                                Fazer Login
                            </LoginBtn>
                        )}
                    </span>

                    <ProfileImg
                        src={
                            auth.user
                                ? auth.user.profile ?? ProfileImage
                                : ProfileImage
                        }
                        alt="foto de perfil"
                        width={'50px'}
                    />
                </UserArea>
            </HeaderWrapper>
            <span onMouseLeave={() => setVisible(!visible)}>
                {visible && <Menu />}
            </span>
        </>
    );
};

export default Header;
