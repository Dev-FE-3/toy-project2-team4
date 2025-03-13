import styles from "./classItem.module.scss";
import { CLASS_COLORS } from "../index";
import Icon from "../../common/icon/icon";
import Modal from "../../common/modal/modal";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ClassItem({ index, item, onEdit, onDelete }) {
  const role = useSelector((state) => state.auth.user?.role);
  const isAdmin = role === "admin";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const color = CLASS_COLORS[item.title] || "#E0E0E0"; // 없으면 기본 회색
  const backgroundColor = `${color}33`; // HEX 뒤에 "33" 추가 → 약 20% 투명도 (RGBA로 변환됨)

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(item.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        key={index}
        className={styles.classItem}
        style={{
          borderColor: color, // 선명한 색
          backgroundColor: backgroundColor, // 반투명 배경
        }}
      >
        <p>{item.title}</p>
        {isAdmin && (
          <div className={styles.adminIconContainer}>
            <>
              <div className={styles.icon} onClick={() => onEdit(item)}>
                <Icon
                  iconname="edit" // 연필 아이콘
                  size="20px"
                />
              </div>
              <div className={styles.icon} onClick={handleDeleteClick}>
                <Icon
                  style="outlined"
                  iconname="close" // X 아이콘
                  size="20px"
                />
              </div>
            </>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <Modal
          onCancel={() => setShowDeleteModal(false)}
          onCheck={handleDeleteConfirm}
          title="수업 삭제"
          titleIcon={<Icon style="rounded" iconname="warning" size="2rem" color="#d86060"></Icon>}
          checkButtonColor="red"
          showCancelButton={true}
        >
          <p>정말로 이 수업을 삭제하시겠습니까?</p>
        </Modal>
      )}
    </>
  );
}
