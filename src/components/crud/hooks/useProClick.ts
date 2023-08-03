import { getCurrentInstance } from "vue";

export function useProClick(){

   const instance = getCurrentInstance()

   if(instance){
    const proxy = instance.proxy
    proxy?.$
   }
}