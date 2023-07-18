import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Header from '../components/header';

type Props = {
  children: any,
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const { isUserHasToken } = useSelector((state: any) => state.loginSignupReducer.loginSignupVar)

  useEffect((): any => {
    if (!isUserHasToken) {
      navigate("/login");
    }
  }, [isUserHasToken, navigate])

  return <>
    <Header />
    {children}
  </>;
}

export default ProtectedRoute