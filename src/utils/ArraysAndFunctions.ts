
//função que verifica nas revisões se há um post atribuido à ela
export const onChangeHeart = (reviews, id) => {
    let index = reviews.findIndex(i => i.postId === id);

    if (index !== -1) {
        return true
    }
    return false
}
//função que verifica nos followings do user se há um id passado 
export const onChangeFollow = (followings, uid) => {
    if (followings.length > 0) {
        let index = followings.findIndex(id => id === uid);
        if (index !== -1) {
            return true
        }
    }

    // users.filter(user => user.euid === id).forEach(user => {
    //     const res = user.efollowers.findIndex(item => item === uid)
    //     if (res !== -1) {
    //         setFollowing(true);
    //     }
    // });

    return false
}