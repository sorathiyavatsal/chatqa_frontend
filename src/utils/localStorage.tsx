import Cookies from 'universal-cookie';

export const setUserTokenInLocalSorage = (data:any) => {
    localStorage.setItem('chatQa_token', data.access_token)
    localStorage.setItem('chatQa_rtoken', data.refresh_token)
}

export const setUserDetailInLocalSorage = (data:any) => {
    const cookies = new Cookies();
    localStorage.setItem('chatQa_token', data.access_token)
    localStorage.setItem('chatQa_rtoken', data.refresh_token)
    localStorage.setItem('chatQa_user', JSON.stringify(data));
    cookies.set('_ata', data?.access_token, { path: '/' });
}
export const getUserDetailFromLocalSorage = () => {
    let getData:any = localStorage.getItem('chatQa_user')
    const localUserDetail = JSON.parse(getData)
    return localUserDetail
}

export const getUserTokenInLocalSorage = () => {
    let getData:any = localStorage.getItem('chatQa_token')
    return getData
}

export const getUserRefreshTokenInLocalSorage = () => {
    let getData:any = localStorage.getItem('chatQa_rtoken')
    return getData
}


