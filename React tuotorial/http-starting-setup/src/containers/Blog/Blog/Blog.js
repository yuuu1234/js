import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../../components/Post/Post/Post';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import './Blog.css';
import post from '../../../components/Post/Post/Post';


class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
    }
    componentDidMount() {
        console.log('http request');
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({ posts: updatedPosts })
            });

    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
        console.log('clicked');
    }

    render() {
        console.log('rendered')
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} clicked={() => this.postSelectedHandler(post.id)} />
        })
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/ner-post">New Post</a>
                            </li>
                        </ul>
                    </nav>
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