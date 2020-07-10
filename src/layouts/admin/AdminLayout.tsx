import React from 'react';
import {createStyles, Drawer, makeStyles, MenuItem, MenuList} from '@material-ui/core';
import styles from './AdminLayout.module.scss';
import {Link, useLocation} from 'react-router-dom';
import {
  CourierActiveLogo,
  CourierIcon,
  CustomerIcon,
  RestaurantIcon,
  LogoutIcon,
  OrderDisableLogo,
  OrderIconActive,
  PanelLogo,
  SettingsIcon,
  PagesIcon,
  PagesActiveIcon,
} from '../../assets';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';

const drawerWidth = 190;

interface MenuLink {
  label: string;
  path: string;
  icon: string;
  activeIcon?: string; // TODO: WAIT for all icons
}
const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      position: 'relative',
      background: '#4065E0',
      border: 'none',
    },
    selected: {
      backgroundColor: '#ffffff !important',
      '&:hover': {
        backgroundColor: '#ffffff !important',
      },
    },
  }),
);

const AdminLayout: React.FC = ({children}) => {
  const {t} = useTranslation('adminLayout');
  const classes = useStyles();
  const {pathname} = useLocation();

  const links: MenuLink[] = [
    {
      label: t('orders'),
      path: 'orders',
      icon: OrderDisableLogo,
      activeIcon: OrderIconActive,
    },
    {label: t('customers'), path: 'customers', icon: CustomerIcon},
    {
      label: t('courier'),
      path: 'couriers',
      icon: CourierIcon,
      activeIcon: CourierActiveLogo,
    },
    {label: t('restaurants'), path: 'restaurants', icon: RestaurantIcon},
    {label: t('settings'), path: 'settings', icon: SettingsIcon},
    {
      label: t('pages'),
      path: 'informationPages',
      icon: PagesIcon,
      activeIcon: PagesActiveIcon,
    },
    {label: t('logout'), path: 'logout', icon: LogoutIcon},
  ];

  const renderMenuLink = (link: MenuLink, path: string) => {
    const isSelected = `/${link.path}` === path;
    return (
      <MenuItem
        className={styles.adminContainer__aside__drawer__list__item}
        classes={{selected: classes.selected}}
        selected={isSelected}
        component={Link}
        to={`/${link.path}`}
        key={Math.random()}
      >
        <img
          src={isSelected && link.activeIcon ? link.activeIcon : link.icon}
          alt={link.path}
        />
        <span
          className={classNames(styles.adminContainer__aside__drawer__list__item__text, {
            [styles.activeLink]: isSelected,
          })}
        >
          {link.label}
        </span>
      </MenuItem>
    );
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.adminContainer__aside}>
        <Drawer
          className={styles.adminContainer__aside__drawer}
          classes={{paper: classes.drawerPaper}}
          variant="permanent"
        >
          <div className={styles.adminContainer__aside__drawer__logo}>
            <img src={PanelLogo} alt="logo" />
          </div>
          <MenuList className={styles.adminContainer__aside__drawer__list}>
            {links.map((link) => renderMenuLink(link, pathname))}
          </MenuList>
        </Drawer>
      </aside>
      {children}
    </div>
  );
};

export default AdminLayout;
