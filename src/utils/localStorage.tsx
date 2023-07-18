import Cookies from 'universal-cookie';

export const setUserTokenInLocalStorage = (data: any) => {
    localStorage.setItem('chatQa_token', data.access_token)
    localStorage.setItem('chatQa_rtoken', data.refresh_token)
}

export const setUserDetailInLocalStorage = (data: any) => {
    const cookies = new Cookies();
    localStorage.setItem('chatQa_token', data.access_token)
    localStorage.setItem('chatQa_rtoken', data.refresh_token)
    localStorage.setItem('chatQa_user', JSON.stringify(data));
    var token = data?.access_token;
    var length = token?.length;
    var trimmedString = token?.substring(7, length);
    cookies.set('_ata', trimmedString);
    var point = data?.points
    cookies.set('_points', point)
}
export const getUserDetailFromLocalStorage = () => {
    let getData: any = localStorage.getItem('chatQa_user')
    const localUserDetail = JSON.parse(getData);
    return localUserDetail
}

export const getUserTokenInLocalStorage = () => {
    let getData: any = localStorage.getItem('chatQa_token')
    return getData
}

export const getUserRefreshTokenInLocalStorage = () => {
    let getData: any = localStorage.getItem('chatQa_rtoken')
    return getData
}
export const setUserInLocalStorage = (data: any) => {
    localStorage.setItem('chatQa_user', JSON.stringify(data));
}
