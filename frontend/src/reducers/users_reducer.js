import { RECEIVE_USER } from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
    switch (action.type) {
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