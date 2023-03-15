import { getToken, verifyToken } from "../auth/tokenMgmt";

export const serverUrl='http://localhost:3000/';

const  handleRequest = (
  url:string,
  method:string,
  headers?:HeadersInit,
  data?:object,
  checkToken=true)
: Promise<Response> | null =>
{
  if(checkToken && !verifyToken()){
        return null;
  }

    const config={
      method, 
      headers:{
        ...headers,
        'x-auth-token': getToken()
      },
      body: (data) ? JSON.stringify(data) : null
    }

    return fetch(url, config);
}

export const getRequest = (endPoint:string): Promise<Response> | null=>{        
  return handleRequest(`${serverUrl}${endPoint}`,'GET');
}

export const postRequest = (endPoint:string, data:object,checkToken?:boolean): Promise<Response> | null=>{
  return handleRequest(`${serverUrl}${endPoint}`,'POST',{'content-type': 'application/json'},data,checkToken);
}

export const patchRequest = (endPoint:string, data:object): Promise<Response> | null=>{
  return handleRequest(`${serverUrl}${endPoint}`,'PATCH',{'content-type': 'application/json'},data);
}

export const deleteRequest = (endPoint:string): Promise<Response> | null=>{
  return handleRequest(`${serverUrl}${endPoint}`,'DELETE');
}