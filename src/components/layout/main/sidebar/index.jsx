import { TabLink } from 'components/molecules';
import styles from './styles.module.scss';

import { ReactComponent as ProductSVG } from 'assets/icons/sidebar/product-icon.svg';
import { ReactComponent as SuppplierSVG } from 'assets/icons/sidebar/supplier-icon.svg';
import { ReactComponent as CustomerSVG } from 'assets/icons/sidebar/customer-icon.svg';
import { ReactComponent as FactorySVG } from 'assets/icons/sidebar/factory-icon.svg';
import { ReactComponent as CustomerOrderSVG } from 'assets/icons/sidebar/customer-order-icon.svg';
import { ReactComponent as DevlieryOrderSVG } from 'assets/icons/sidebar/delivery-order-icon.svg';
import { ReactComponent as UserManagementSVG } from 'assets/icons/sidebar/user-management-icon.svg';
import { Divider } from 'components/atoms';

const { root, sidebar, sidebar_menu, sidebar_menu__title } = styles;

const masterDataMenus = [
  // {
  //   title: 'Product',
  //   path: '/product',
  //   icon: <ProductSVG width={14} height={14} />,
  // },
  {
    title: 'Supplier',
    path: '/supplier',
    icon: <SuppplierSVG width={14} height={14} />,
  },
  {
    title: 'Customer',
    path: '/customer',
    icon: <CustomerSVG width={14} height={14} />,
  },
  {
    title: 'Factory',
    path: '/factory',
    icon: <FactorySVG width={14} height={14} />,
  },
];

const orderMenus = [
  {
    title: 'Customer Order',
    path: '/customer-order',
    icon: <CustomerOrderSVG width={14} height={14} />,
  },
  {
    title: 'Delivery Order',
    path: '/delivery-order',
    icon: <DevlieryOrderSVG width={14} height={14} />,
  },
];

const userMenus = [
  {
    title: 'User Management',
    path: '/user-management',
    icon: <UserManagementSVG width={14} height={14} />,
  },
];

const MainSidebar = () => {
  return (
    <aside className={root}>
      <div className={sidebar}>
        <h6 className={sidebar_menu__title}>Master Data</h6>
        <nav className={sidebar_menu}>
          {masterDataMenus?.map((menu) => {
            return (
              <TabLink to={menu.path} prefixIcon={menu.icon}>
                {menu.title}
              </TabLink>
            );
          })}
        </nav>
        <Divider />
        <nav className={sidebar_menu}>
          {orderMenus?.map((menu) => {
            return (
              <TabLink to={menu.path} prefixIcon={menu.icon}>
                {menu.title}
              </TabLink>
            );
          })}
        </nav>
        <Divider />
        <nav className={sidebar_menu}>
          {userMenus?.map((menu) => {
            return (
              <TabLink to={menu.path} prefixIcon={menu.icon}>
                {menu.title}
              </TabLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default MainSidebar;
