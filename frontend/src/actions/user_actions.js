import * as APIUtil from '../util/user_api_util';


export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveUser = user => {
    return ({
        type: RECEIVE_USER,
        user
    })
};

export const receiveUsers = (users) => {
    return ({
        type: RECEIVE_USERS,
        users
    })
};


export const fetchUser = userId => dispatch => {
    return APIUtil.getUser(userId)
        .then(user => dispatch(receiveUser(user)))
}

export const fetchUsers = () => dispatch => {
    return APIUtil.getUsers()
        .then(users => dispatch(receiveUsers(users))
        );
}


export const updateUser = user => dispatch => {
    return APIUtil.editUser(user)
        .then(user => dispatch(receiveUser(user))
        );
}
