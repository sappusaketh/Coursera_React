import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link } from 'react-router-dom';
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
    if(comments!==undefined){
        var options = {  year: 'numeric', month: 'long', day: 'numeric' };
        return(
        
        <ul className="list-unstyled">
        {comments.map((dishComment)=>{
            return(
                <li key={dishComment.id} >
                <p>{dishComment.comment}</p>
                <p>-- {dishComment.author}, {new Date(dishComment.date).toLocaleDateString("en-US", options)}</p>
            </li> 
            )     
            
        }) } 
        </ul>
        
    )

    }else{
        return (<div></div>)
    }
        
}

const DishDetail=(props)=>{
    
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">            
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
            )    
   
        
}
    



export default DishDetail;