import { atom } from "recoil";

const useratom=atom({
    key:'auth',
    default:JSON.parse(localStorage.getItem('token'))
})

export default useratom