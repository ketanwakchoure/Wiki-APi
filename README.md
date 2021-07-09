# Wiki-APi
REST API has been implemented to create an Wikipedia prototype in the form of API.

Using ExpressJS created a route which chain's all the methods of the REST API.
Database is created with mongoDB.

Implementation for specific article :
  .get -> to read a specific article.
  .put -> to update a article by deleting previous one and adding a new one.
  .patch -> to update a article by modifying previous version.
  .delete -> to delete article.
  
Implementation for all articles :
  .get -> to read all articles.
  .delete -> to delete all articles.
  .post -> to create a article.

