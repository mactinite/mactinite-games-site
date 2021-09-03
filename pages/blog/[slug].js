import { useEffect, useState, useRef } from "react";
import imageUrlBuilder from '@sanity/image-url'
const sanityClient = require('@sanity/client');

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";


const client = sanityClient({
    projectId: 'ef83jjfc',
    dataset: 'production',
    apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)


function urlFor(source) {
    return builder.image(source)
}

export async function getStaticPaths() {

    const query = `*[_type == "post"] {slug}`
    const posts = await client.fetch(query);
    const paths = posts.map((post) => {
        return "/blog/" + post.slug.current;
    })


    // Call an external API endpoint to get posts
    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    var slug = context.params.slug;
    const query = `*[_type == "post" && slug.current == "${slug}"][0]{..., author->{name}}`;
    const post = await client.fetch(query);


    const html = await unified()
        .use(parse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .processSync(post.body).value;
    return {
        props: { ...post, html }, // will be passed to the page component as props
    }
}

const Blog = ({ title, body, author, imageUrl, mainImage, html }) => {
    var heroImageUrl = urlFor(mainImage).size(900, 600).fit("fill").blur(60).url();
    var heroImageStyle = { background: "url(" + heroImageUrl + ") no-repeat fixed center", backgroundSize: "cover" }
    return (
        <>
            <div className="feature blur" style={heroImageStyle}>
                <div className="sm:w-full md:w-10/12 blog-title mx-auto">
                    <h1>{title}</h1>
                    <span>by {author.name}</span>
                </div>
            </div>
            <div className="container w-full md:w-10/12 mx-auto py-16">
                <article className="prose prose-sm md: lg:prose-md lg:prose-xl" dangerouslySetInnerHTML={{ __html: html }} />

            </div>
        </>
    )
}

export default Blog;