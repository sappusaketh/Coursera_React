import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

    //function to render selected dish details
function RenderDish({dish}){
    
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>   
                <CardText> {dish.description} </CardText>
            </CardBody>
        </Card>          
    )
        
}
//function to render comments for selected dish
function RenderComments({comments}){
    const dish_comments= comments.map((dishComment)=>{
        var options = {  year: 'numeric', month: 'long', day: 'numeric' };
        var date= new Date(dishComment.date).toLocaleDateString("en-US", options)
            return(
            <ul  key={dishComment.id} className="list-unstyled">     
                <li  className="mb-4">
                    {dishComment.comment}
                </li>
                <li className="mb-4">-- {dishComment.author}, {date}</li>    
            </ul>
            )
        })
        return(
            <div>
                <h4>Comments</h4>
                {dish_comments}
            </div>
    )
}


const DishDetail=(props)=>{
    if(props.dish!==undefined){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">            
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
            )    
    }else{
        return <div></div>
    }
        
}
    



export default DishDetail;