import { useEffect, useState, useRef } from "react";
const sanityClient = require('@sanity/client');
const BlockContent = require("@sanity/block-content-to-react");

import Head from 'next/head'
import Link from "next/link";

export async function getStaticProps(context) {
    const client = sanityClient({
        projectId: 'ef83jjfc',
        dataset: 'production',
        apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
        useCdn: true, // `false` if you want to ensure fresh data
    })

    const query = `*[_type == "post"]{title, author->{name}, body, _createdAt, slug, "imageUrl": mainImage.asset->url} | order(_createdAt desc)`;
    const res = await client.fetch(query);
    return {
        props: { posts: res }, // will be passed to the page component as props
    }
}

const Blog = ({ posts = [] }) => {
    return (
        <>
            <Head>
                <title>Mactinite Games - Blog</title>
                <meta name='description' content="Mactinite Games is a solo indie game developer based in Seattle, US." />
            </Head>

            <div className="container">
                <h1>Latest Updates</h1>

                <div className="blog-list">
                    {posts.map((post) => {
                        console.log(post.imageUrl);
                        return (

                            <div className="blog-card card-1">
                                <div className="content">
                                    <h2>{post.title}</h2>
                                    <p className="sub-head">by {post.author.name}</p>
                                </div>
                                <figure className="blog-preview-img">
                                    <img src={post.imageUrl+"?h=250"} />
                                </figure>
                                <div className="content">
                                    <div className="blog-preview">
                                        <BlockContent blocks={post.body} />
                                    </div>
                                </div>
                                <Link href={`/blog/${post.slug.current}`}>
                                    <a className="button">See more</a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default Blog;