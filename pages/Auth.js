import { useSelector, useDispatch } from "react-redux";
import Action from './actions/index'
import HomePage from './HomePage'

import  Main from "./Main";

const pages = {
    home:HomePage
};


export default function Auth() {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.activePage);
  console.log(activePage);
 

  let Page = pages[activePage];
  
  Page = Page ||Main;
  return (
    <div>
      <Page />
    </div>
  );
}