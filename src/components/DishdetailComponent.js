import React,{ Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
class DishDetail extends Component{
    // constructor(props){
    //     super(props);
        
    // }
    

    //function to render selected dish details
    renderDish(dish){
        if(dish!==undefined){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>   
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>          
            )
        }else{
            return(<div></div>)
        }
    }
    //function to render comments for selected dish
    renderComments(dish){
        if(dish!==undefined){
            if(dish.comments!==null){
                const dish_comments= dish.comments.map((dishComment)=>{
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
            }else{
            return(<div></div>)
            }
        }else{
            return(<div></div>)
        }
    }


    render(){
        const dish=this.props.dish;
        
        return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 m-1">            
                    {this.renderComments(dish)}
                </div>
            </div>
        </div>
        )    
    }
}

export default DishDetail;