// 액션 생성 함수 (Action Creators)
export const setListDatas = (datas) => ({
  type: "SET_LIST_DATAS",
  payload: datas,
});

export const setSelectedList = (selectedList) => ({
  type: "SET_SELECTED_LIST",
  payload: selectedList,
});

export const deleteList = (num) => ({
  type: "DELETE_LIST",
  payload: num,
});

// 초기 상태
const initialState = {
  listDatas: [],
  selectedList: null,
  userEmail: "",
  isModal: false,
};

// 리듀서 함수
const modificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST_DATAS":
      return { ...state, listDatas: action.payload };

    case "SET_SELECTED_LIST":
      return { ...state, selectedList: action.payload };

    case "DELETE_LIST":
      return {
        ...state,
        listDatas: state.listDatas.filter((item) => item.num !== action.payload),
        selectedList: null,
      };

    default:
      return state;
  }
};

export default modificationReducer;
