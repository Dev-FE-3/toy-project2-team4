import styles from "./CenteredLayout.module.scss";

function CenteredLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default CenteredLayout;
