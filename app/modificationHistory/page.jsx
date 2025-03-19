import ModificationHistory from "../../components/modification/modificationHistory/modificationHistory";
import styles from "./modificationHistory.module.scss";

export default function ModificationHistoryPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>정정 내역</h1>
      <ModificationHistory />;
    </>
  );
}
