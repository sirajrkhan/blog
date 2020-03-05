import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
        errorLog: null
    }

    componentDidUpdate(){
        if (this.props.id){
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts/'+this.props.id)
                .then(
                    response => {
                        this.setState({loadedPost: response.data})
                    }
                )
                .catch(
                    response => {
                        console.log('Error: ', response);
                        this.setState({errorLog:response})
                }
            )    
            }

        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+this.props.id)
        .then(
            response => {
                console.log(response);
            }
            )    
    }
    render () {
        let postMsg = (this.props.id)?'Loading...':'Please select a Post'
        let post = <p style={{textAlign: `center`}}>{postMsg}</p>;

        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;