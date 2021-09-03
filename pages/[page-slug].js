import { useEffect, useState, useRef } from "react";
const BlockContent = require("@sanity/block-content-to-react");
const sanityClient = require('@sanity/client');

export async function getStaticPaths() {
    const client = sanityClient({
        projectId: 'ef83jjfc',
        dataset: 'production',
        apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
        useCdn: true, // `false` if you want to ensure fresh data
    })
    const query = `*[_type == "page"] {slug}`
    const pages = await client.fetch(query);
    const paths = pages.map((page) => {
        return "/"+page.slug.current;
    })


    // Call an external API endpoint to get posts
    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    var slug = context.params["page-slug"];
    const client = sanityClient({
        projectId: 'ef83jjfc',
        dataset: 'production',
        apiVersion: '2019-01-29', // use current UTC date - see "specifying API version"!
        useCdn: true, // `false` if you want to ensure fresh data
    })
    console.log(slug);
    // here we are querying for the page and then materializing the image assets within the body
    const query = `*[_type == "page" && slug.current == "${slug}"][0]{title, body[]{..., asset->{..., "_key": _id}}}`;
    const page = await client.fetch(query);
    return {
        props: page, // will be passed to the page component as props
    }
}

const Page = ({title, body}) => {
    return (
        <>
            <div className="container w-10/12 mx-auto my-8">
                <div className="prose prose-sm md: lg:prose-md lg:prose-xl">
                <h1 className="mt-0">{title}</h1>
                <BlockContent blocks={body}/>
                </div>
            </div>
        </>
    )
}

export default Page;