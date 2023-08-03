/**
 * 
request demo

import { useDefAxiosRequest } from "@/utils/request";

export function useBooksRequset() {
  return useDefAxiosRequest<{ id: string, name: string, pubTime: string }[]>({ url: "/api/books" })
}

const { execute, response, data, loading } = useBooksRequset()
*/


export {}
