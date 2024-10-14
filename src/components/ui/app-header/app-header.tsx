import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <BurgerIcon
          type={location.pathname === '/' ? 'primary' : 'secondary'}
        />
        <Link
          to='/'
          className={
            location.pathname === '/' ? styles.link_active : styles.link
          }
        >
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <>
          <ListIcon
            type={
              location.pathname.startsWith('/feed') ? 'primary' : 'secondary'
            }
          />
          <Link
            to='/feed'
            className={
              location.pathname.startsWith('/feed')
                ? styles.link_active
                : styles.link
            }
          >
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon
          type={
            location.pathname.startsWith('/profile') ? 'primary' : 'secondary'
          }
        />
        <Link
          to='/profile'
          className={
            location.pathname.startsWith('/profile')
              ? styles.link_active
              : styles.link
          }
        >
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
