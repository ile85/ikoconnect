<%- include('../partials/header') %>

<main class="mt-3">
  <h2 class="text-center mb-3">📚 Blog Posts</h2>

  <% if (posts && posts.length > 0) { %>
    <% posts.forEach(post => { %>
      <article class="blog-post mb-3">
        <h3>
          <a href="/blog/<%= post.slug %>"><%= post.title %></a>
        </h3>
        <p class="text-muted"><%= post.date %></p>
        <p><%= post.description %></p>
        <div class="post-preview">
          <%- post.content.substring(0, 300) %>...
        </div>
        <a href="/blog/<%= post.slug %>" class="btn btn-outline mt-2">Read More</a>
      </article>
    <% }) %>
  <% } else { %>
    <p class="text-center">No blog posts available right now. Check back soon!</p>
  <% } %>
</main>

<%- include('../partials/footer') %>
