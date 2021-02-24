import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../Post/Post';
import FullPost from '../FullPost/FullPost';
import NewPost from '../NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return (
            <div>
                <header>
                    <ul>
                        <li><a href='/'>Posts</a></li>
                        <li><a href='/new-posts'>New Posts</a></li>
                    </ul>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;