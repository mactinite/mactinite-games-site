import { useEffect, useState, useRef } from "react";
const sanityClient = require('@sanity/client');
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../serializers";
import Head from 'next/head'
import Link from "next/link";

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";


export async function getStaticProps(context) {
    const client = sanityClient({
        projectId: 'ef83jjfc',
        dataset: 'production',
        apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
        useCdn: true, // `false` if you want to ensure fresh data
    })

    const query = `*[_type == "post"]{..., categories[]->, author->{name}, "imageUrl": mainImage.asset->url} | order(_createdAt desc)`;
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

            <div className="container w-4/6 mx-auto">
                <h1>Latest Updates</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {posts.map((post) => {
                        return (
                            <div className="relative blog-card flex flex-col justify-start min-w-lg max-w-lg w-100 background-dark rounded-lg card-1">
                                <Link href={`/blog/${post.slug.current}`}>
                                    <a>
                                        <div className ="absolute top-0 left-0 right-0 z-10 px-2 py-2 flex flex-row justify-end">
                                            <span className="text-xs">{post.categories.map((category) => <span className="text-xs background-dark px-2 rounded-xl">{category.title}</span>)}</span>
                                        </div>
                                        <figure className="blog-preview-img overflow-hidden rounded-t-lg mt-0 pt-0 mb-auto">
                                            <img src={post.imageUrl + "?h=250"} />
                                        </figure>
                                        <div className="content">
                                            <h2 className="text-xl ">{post.title}</h2>
                                            <p className="text-xs">
                                                by <span className="text-xs">{post.author.name} </span>

                                            </p>
                                        </div>
                                        <div className="content mt-auto">
                                            <div className="blog-preview">
                                                {post.summary}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full mx-auto text-center py-8">
                    <p className="text-sm">Check back later for more content!</p>
                </div>
            </div>
        </>
    )
};

export default Blog;