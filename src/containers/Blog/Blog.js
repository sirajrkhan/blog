import React, { Component } from 'react';
import axios from 'axios';
// import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedID: null,
        errorState: false
    }

    componentDidMount(){
        axios.get('/posts')
        .then( response => {
            const posts = response.data.slice(3,7);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Siraj'
                }
            })
            this.setState({posts: updatedPosts})
        })
        .catch(
            error => {
                // console.log(error);
                this.setState({errorState:true})
            }
        )
    }

    selectedIDHandler = (id) => {
        this.setState({selectedID: id})
    } 

    render () {
        const posts = this.state.posts;
        const post = posts.map( post => { 
            return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.selectedIDHandler(post.id)} />
        })

        return (
            <div>
                {this.state.errorState ? <div style={{color: `red`, textAlign: `center`}}>Kuchh to gadbad hai...</div> : null}
                <section className="Posts">
                    {post}
                </section>
                <section>
                    <FullPost id={this.state.selectedID} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;