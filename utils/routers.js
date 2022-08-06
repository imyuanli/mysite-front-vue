
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
   window.location.href = '/pages/index/index'
}
