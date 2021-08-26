//노예 이름
export const CHECK_ID_REQUEST = "CHECK_ID_REQUEST";
export const CHECK_ID_SUCCESS = "CHECK_ID_SUCCESS";
export const CHECK_ID_FAILURE = "CHECK_ID_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

//노예 생성함수( 재사용 할거면 사용하자 )
export const checkIdRequestAction = (data) => ({ type: CHECK_ID_REQUEST, data });
//초기 상태
const initalState = {
    id: 1, //DB ID
    me: null,
    signUpLoading: false,//회원가입 시도중
    signUpDone: false,
    signUpError: false,
    checkIdLoading: false, //중복 체크 시도중
    checkIdDone: false,
    checkIdError: false,
}
//리듀서
//이전 상태를 최신 상태로 교체 (은행원)
const reducer = (state = initalState, action) => {
    switch (action.type) {
        case CHECK_ID_REQUEST:
            return {
                ...state,
                checkIdLoading: true,
                checkIdDone: false,
                checkIdError: false,
            }
        case CHECK_ID_SUCCESS:
            return {
                ...state,
                checkIdLoading: false,
                checkIdDone: true,
            }
        case CHECK_ID_FAILURE:
            return {
                ...state,
                checkIdLoading: false,
                checkIdError: true,
            }

        default: return state;
    }
}
export default reducer;
