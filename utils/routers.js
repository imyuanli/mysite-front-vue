export const goToLoginPage = (route) => {
    if(route){
        uni.navigateTo({
            url: `/pages/login/index?redirect=${route}`
        });
    }else{
        uni.navigateTo({
            url: `/pages/login/index`
        });
    }
}

export const redirectToIndex = () => {
    uni.redirectTo({
        url:'/pages/index/index'
    })
}
