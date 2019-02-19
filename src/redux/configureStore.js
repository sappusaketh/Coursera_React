import {createStore,combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';


export const ConfigureStore= ()=>{
    const store= createStore(
       combineReducers({
           dishes:Dishes,
           comments:Comments,
           promotions:Promotions,
           leaders:Leaders
       }), applyMiddleware(thunk,logger)
    )
    return store;
}