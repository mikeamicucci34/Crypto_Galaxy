import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {...action.users.data}
        case RECEIVE_USER:
            return {
                user: action.user.data
            };
        default:
            return state;
    }
}
//Made changes to isAuthenticated in ReceiveUserSignIn

export default UserReducer