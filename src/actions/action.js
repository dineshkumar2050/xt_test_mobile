import { FILTER } from './actionTypes';

export const filter = (data)=>  dispatch=>{
    try{
        dispatch({
            type : FILTER,
            payload : data
        })
    }   
    catch(err){
        console.log(err);
    }
}