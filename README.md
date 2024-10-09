# PortfolioAPI

### API for [portfolio](https://sundehakon.tech/) project

#### Mainly used to provide data for blog, which includes posts and comments

> https://api.sundehakon.tech/Blogs

This link allows GET requests for displaying blog posts on other platforms
PS. POST requests are locked behind an auth wall. If you wish to make changes to blogs etc. contact me at hakon.su@gmail.com

***OUT NOW***
> https://api.sundehakon.tech/Comments

This endpoint provides data for comments underneath each blog post. Sensitive information are not stored in the comment data, only public identifiers. A verified Auth0 ID in my system is mandatory for POST requests to the server. 
