// import store from "store";
//
// export const getStore=(arg)=>{
//     store.get(arg)
// }
// export const setStore=(arg,prop)=>{
//     store.set(arg,prop)
// }
//
// export const removeStore=(arg)=>{
//     store.remove(arg)
// }
export const fnTime = (time) => {
    let ptime = new Date(time).toLocaleString()
    let timeArr = ptime.split(' ')
    let year = myGetYear(timeArr[0])
    let minutes = myGetMinutes(timeArr[1])
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const date = new Date();
    const yeard = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = `${yeard}-${month}-${day}`;
    const nowTime = new Date(today).getTime();
    const yesterdayTime = new Date(nowTime - twentyFourHours).getTime();
    if (time >= nowTime) {
        return '今天 ' + minutes;
    } else if (ptime < nowTime && yesterdayTime <= ptime) {
        return '昨天 ' + time.split(' ')[1];
    } else {
        return year + " " + minutes;
    }
}
export const myGetYear = (year) => {
    let yearArr = year.split('/')
    return yearArr[0] + "年" + yearArr[1] + "月" + yearArr[2] + "日"
}
export const myGetMinutes = (minutes) => {
    let minutesArr = minutes.split(':')
    return minutesArr[0] + ":" + minutesArr[1]
}
