import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const addComment=comment=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
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

export const postComment = (dishId, rating, author, comment)=>(dispatch)=>{
    const newComment={
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment,
        
    }
    newComment.date=new Date().toISOString();

    return fetch(baseUrl+'comments',{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{"Content-Type":"application/json"},
        credentials:"same-origin"
    }).then(response=>{
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
    .then(response=>dispatch(addComment(response)))
    .catch(err=>{
        console.log("Post Commnet Error:",err.message)
        alert("Your Comment cannot be posted\n"+err.message)
    });
}

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
// Leaders

export const fetchLeaders=()=>(dispatch)=>{
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
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
    .then(leaders=>dispatch(addLeaders(leaders)))
    .catch(err=>dispatch(leadersFailed(err.message)));
}

export const leadersLoading=()=>({
    type:ActionTypes.LEADERS_LOADING
})

export const leadersFailed=(errmss)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errmss
})

export const addLeaders=(leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
})

// Feedback

export const addFeedback=(feedback)=>({
    type:ActionTypes.ADD_FEEDBACK,
    payload:alert("Thank you for submitting feedback\n"+ JSON.stringify(feedback))
    
})
   

export const postFeedback=(newFeedback)=>(dispatch)=>{
    const feedback={...newFeedback,date:new Date().toISOString()}
    return fetch(baseUrl+'feedback',{
        method:'POST',
        body:JSON.stringify(feedback),
        headers:{"Content-Type":"application/json"},
        credentials:"same-origin"
    }).then(response=>{
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
    .then(response=>dispatch(addFeedback(response)))
    .catch(err=>{
        console.log("Post Feedback Error:",err.message)
        alert("Your Feedback cannot be posted\n"+err.message)
    });
}
