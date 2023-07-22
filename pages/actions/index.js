import actiontype from './actiontype'
let id=0

function Save(payload){

  console.log(payload,id++);
  return{
    type:actiontype.SAVE,
    payload:{...payload,id:id}
  }
}



function Delete(payload) {
  return {
    type: actiontype.DELETE,
    payload 
  };
}

function Edit(payload) {
  return {
    type: actiontype.EDIT,
    payload
  };
}

function RedirectTo(payload){
  return{
    type:actiontype.MOVE_TO_PAGE,
    payload
  }
}


export default {Save,Delete,Edit,RedirectTo}