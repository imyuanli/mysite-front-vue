import store from "store";

export const getStore=(arg)=>{
    store.get(arg)
}
export const setStore=(arg,prop)=>{
    store.set(arg,prop)
}

export const removeStore=(arg)=>{
    store.remove(arg)
}