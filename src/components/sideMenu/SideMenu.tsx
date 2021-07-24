import React from 'react';
import styles from './SideMenu.module.css';
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';
import { SubMenu } from 'rc-menu';

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((m, i) => (
        <SubMenu
          key={`side-menu-${i}`}
          title={
            <span>
              <GifOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smi) => (
            <SubMenu
              key={`sub-menu-${smi}`}
              title={
                <span>
                  <GifOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((smi, smii) => (
                <Menu.Item key={`sub-sub-menu-${smii}`}>
                  <span>
                    <GifOutlined />
                    {smi}
                  </span>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};
