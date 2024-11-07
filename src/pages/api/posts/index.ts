
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async({params, request}) => {

  const blogPosts = await getCollection('blog');

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (slug) {
    const post = blogPosts.find((post) => post.slug === slug);
    if (post) {
      return new Response(
        JSON.stringify(post),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } 
    return new Response(
      JSON.stringify({ error: 'Post not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify(blogPosts),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
};