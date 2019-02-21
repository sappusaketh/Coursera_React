import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import{connect} from 'react-redux';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group'

const mapDispatchToProps= dispatch=>({
  postComment: (dishId, rating, author, comment)=>dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  fetchPromos: ()=>{dispatch(fetchPromos())},
  fetchComments: ()=>{dispatch(fetchComments())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
})

const mapStateToProps= state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  
  }
  
}
class Main extends Component {
 
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  //eventHandling

  //Rendering
  render() {
    const HomePage=()=>{
      return(<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess} />)
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}/>
      );
    };
   
    return (
      <div >
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/menu" exact component={()=><Menu dishes={this.props.dishes}  /> }/>
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route path="/contactus" exact component={()=>(<Contact resetFeedbackForm={this.props.resetFeedbackForm}/>)}/> 
                <Route path="/aboutus" exact component={()=><About leaders={this.props.leaders} />}/>
                <Redirect to="/home"/>    
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    )
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

