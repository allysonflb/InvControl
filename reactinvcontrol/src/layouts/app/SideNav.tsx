import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  InfoCircleOutlined,
  PieChartOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import { PATH_ABOUT, PATH_DASHBOARD, PATH_LANDING } from '../../constants';
import { COLOR } from '../../App.tsx';
import { Flex } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const BackButton = () => {
  return (
    <Link to={PATH_LANDING.root} style={{ textDecoration: 'none' }}>
      <Flex>
        <RollbackOutlined style={{ fontSize: 14 }} /> {/* Tamanho do ícone */}
        <span style={{ color: 'black' }}></span> {/* Texto ao lado do ícone */}
      </Flex>
    </Link>
  );
};

const items: MenuProps['items'] = [
  getItem(
    <Link to={PATH_DASHBOARD.root}>Dashboard</Link>,
    'dashboard',
    <PieChartOutlined />
  ),
  getItem(
    <Link to={PATH_ABOUT.root}>Emitir relatório</Link>,
    'about',
    <InfoCircleOutlined />
  ),
  getItem(<Link to={PATH_LANDING.root}>Sair</Link>, 'signout', <BackButton />),
];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: COLOR['100'],
              itemHoverBg: COLOR['50'],
              itemSelectedColor: COLOR['600'],
            },
          },
        }}
      >
        <Logo
          color="blue"
          asLink
          href={PATH_LANDING.root}
          justify="center"
          gap="small"
          imgSize={{ h: 40, w: 40 }}
          style={{ padding: '1rem 0' }}
        />
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: 'none' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
