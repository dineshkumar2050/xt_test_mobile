import {FILTER} from '../actions/actionTypes';

const initialState = {
    launchYear : [],
    launch : "",
    landing: "",
    data : []
}

export default function allReducers(state=initialState,action){
    const {type,payload} = action;
    switch (type){
        case FILTER:
            return{
                ...state,
                launchYear : payload.year,
                launch : payload.launch,
                landing: payload.landing,
                data : payload.sendData
            };            
        default : 
            return state;
    }
}