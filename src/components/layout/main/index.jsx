import MainHeader from './header';
import MainSidebar from './sidebar';

import styles from './styles.module.scss';

const { root, content } = styles;

const MainLayout = ({ children }) => {
  return (
    <section className={root}>
      <section>
        <MainHeader />
        <article className={content}>
          <MainSidebar />
          <div>{children}</div>
        </article>
      </section>
    </section>
  );
};

export default MainLayout;
