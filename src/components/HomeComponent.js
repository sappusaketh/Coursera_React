import React from 'react';
import {Card, CardImg, CardTitle, CardText,CardBody,CardSubtitle} from "reactstrap";
import { Loading } from './LoadingComponent';
const Home=function(props){

    function RenderCard({item,isLoading,errMess}){
        if(isLoading){
            return(<Loading />)  
        }
        else if(errMess){
            return({errMess})
        }else{
            return(
                <Card>
                    <CardImg src={item.image} alt={Card.name} />
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation?<CardSubtitle>{item.designation}</CardSubtitle>:null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                    
                </Card>
            )
        }
        
    }


    return(
        <div className="container">
        <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading}
                    errMess={props.errMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
       
    )
}
export default Home;