import { useEffect, useState, useRef } from "react";
const BlockContent = require("@sanity/block-content-to-react");
const sanityClient = require('@sanity/client');
import imageUrlBuilder from '@sanity/image-url'

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
    console.log(post);
    return {
        props: post, // will be passed to the page component as props
    }
}

const Blog = ({ title, body, author, imageUrl, mainImage }) => {
    var heroImageUrl = urlFor(mainImage).size(900, 600).fit("fill").blur(60).url();
    var heroImageStyle = { background: "url(" + heroImageUrl + ") no-repeat fixed center", backgroundSize: "cover" }
    return (
        <>
            <div className="container feature blur" style={heroImageStyle}>
                <div className="blog-title">
                    <h1>{title}</h1>
                    <span>by {author.name}</span>
                </div>
            </div>
            <br />
            <figure>
            </figure>
            <br />
            <div className="container">
                <BlockContent blocks={body} />
            </div>
            <br />
        </>
    )
}

export default Blog;