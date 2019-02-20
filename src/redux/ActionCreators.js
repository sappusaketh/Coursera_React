import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";
export const addComment=(dishId, rating, author, comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:{
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
})

// Dishes
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(dishes=>dispatch(addDishes(dishes))) 
    .catch(err=>dispatch(dishesFailed(err.message)));
}

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})

export const dishesFailed=(errmss)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errmss
})

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})

// Comments
export const fetchComments=()=>(dispatch)=>{
    return fetch(baseUrl+'comments')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json()) 
    .then(comments=>dispatch(addComments(comments)))
    .catch(err=>dispatch(commentsFailed(err.message)))  ;
}

export const commentsFailed=(errmess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
})

export const addComments=(comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})

// Promotions
export const fetchPromos=()=>(dispatch)=>{
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>response.json())
    .then(promos=>dispatch(addPromos(promos)))
    .catch(err=>dispatch(promosFailed(err.message)));
}

export const promosLoading=()=>({
    type:ActionTypes.PROMOS_LOADING
})

export const promosFailed=(errmss)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmss
})

export const addPromos=(promos)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})