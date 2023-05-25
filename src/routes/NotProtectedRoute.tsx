import Header from "../components/header";

type Props = {
    children: any,
  };

const NotProtectedRoute:React.FC<Props> = ({children}) => {
  return <>
  <Header />
  {children}
</>;
}

export default NotProtectedRoute