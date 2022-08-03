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
let foo='Hello';
// function a(){
//     let bar='World';
//     console.log(foo+bar);
// }
// a()
let obj = {a:1,b:2}
obj={...obj,...{a:3,b:4}}
console.log(obj);