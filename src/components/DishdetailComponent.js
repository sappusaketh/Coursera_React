import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Label} from 'reactstrap';
import {Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';
    //function to render selected dish details
function RenderDish({dish}){
    
    return(
        <FadeTransform in
            transformProps={{exitTransform:'scale(0.5) translateY(-50%)'}}>
            <Card>
                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>   
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>    
        </FadeTransform>
                  
    )
        
}
//function to render comments for selected dish
function RenderComments({comments, postComment, dishId}){
    if(comments!==undefined){
        var options = {  year: 'numeric', month: 'long', day: 'numeric' };
        return(
        
        <ul className="list-unstyled">
        <Stagger in>
        {comments.map((dishComment)=>{
            return(
                
                    <Fade in>
                    <li key={dishComment.id} >
                     <p>{dishComment.comment}</p>
                     <p>-- {dishComment.author}, {new Date(dishComment.date).toLocaleDateString("en-US", options)}</p>
                    </li> 
                    </Fade>
                
                
            )     
            
        }) } 
        </Stagger>
        
        <li><CommentForm postComment={postComment} dishId={dishId}/></li>
        </ul>
        
    )

    }else{
        return (<div> <CommentForm postComment={postComment} dishId={dishId}/></div>)
    }
        
}

const maxLength=(len)=>(val)=>!(val)||val.length<=len;
const minLength=(len)=>(val)=>(val)&&val.length>=len;

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isCommentOpen:false
        }
        this.toggleComment=this.toggleComment.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }

    toggleComment(){
        this.setState({
            isCommentOpen:!this.state.isCommentOpen
        })
    }
    createOptions=()=>{
        var options=[];
        for(var i=1;i<=5;i++){
            options.push(<option key={i}>{i}</option>)
        }
        return options
    }
    handleSubmit(values){
        this.toggleComment();
        console.log(values.rating)
        // this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comments)
    }
    render(){
        return(
            <>
                <Button outline onClick={this.toggleComment}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                <Modal toggle={this.toggleComment} isOpen={this.state.isCommentOpen}>
                    <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="m-3" onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                className="form-control">
                                {this.createOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname">Your Name</Label>
                                <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name" className="form-control"
                                validators={{
                                minLength:minLength(3),
                                maxLength:maxLength(15)    }}/>
                                <Errors className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                       
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less',
                                        }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comments">Comments</Label>
                                <Control.textarea model=".comments" rows="6" id="comments" name="comments"
                                className="form-control"/>
                                
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
            )
    }
}
const DishDetail=(props)=>{
    if(props.isLoading){
        return(
            <div className='container'>
                <div className= 'row'>
                    <Loading/>
                </div>
            </div>
        )
        
    }else if(props.errMess){
        return(
            <div className='container'>
                <div className= 'row'>
                    {props.errMess}
                </div>
            </div>
        )
    }
    else{
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
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        )    
    }
        
   
        
}
    



export default DishDetail;