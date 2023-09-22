import Cookie from "js-cookie";


export const setKeyWithValue = (key, value) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
};
export const getValueByKey = (key) => {
  return localStorage.getItem(key);
};




export const GetCookie = (key) => {
  return Cookie.get(key);
}
export const RemoveCookie = (key) => {
  Cookie.remove(key);
}
export const SetCookie = (key, value) => {
  Cookie.set(key, value, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}