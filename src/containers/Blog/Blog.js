import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedID: null
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then( response => {
            const posts = response.data.slice(0,6);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Siraj'
                }
            })
            this.setState({posts: updatedPosts})
        });
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