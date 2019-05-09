### Project Description
Overall, we wanted a wine database that supported features such as filtering by a combination of various parameters and full text. These parameters are variety, vintage, and continent. The country and variety pages have similar functions. Each have a most expensive, least expensive, highest rating, and best value categories that are each a standalone page. The most expensive by either country or variety is the highest price wine in each distinct category. Same goes for the least expensive or by the highest rated by points. Value is the ratio of points to price. That said, value had some difficulties that we will mention in the next section of this summary. The overall page also supports these four categories, but it does not order by distinct variety or country or any other parameter. Instead, it gets the top 10 values by whatever it’s sorting by (e.g. top 10 most expensive wines in the database). 

Countries and varieties each had a standalone page that alphabetically presented each distinct variety or country and how many wines in our database were apart of each distinct one. When you click on a particular variety or country, it gives you all of the wines in just that category.

The home page shows a 100 random wine reviews including all relevant data to that review. We used a few procedures to create the random function. We had a master procedure that used subprocedures to put everything together. 



### Abstract presentation of data models

### Goals Acheived or Not Acheived
#### Acheived:
* Create procedures that streamline the process
* Tabs for sorting by country/variety, combined with aggregation functions for highest/lowest price, points, etc. 
#### Not Acheived:
* Functionality to add custom reviews
* Fully normalized database
* Value categories are not actually showing the maximum value


### Potential for Future Work
##### Protecting against SQL injection attack in search
Our text search box accepted input from users that were put directly into SQL statements at the database. This is bad, because someone could enter something nefarious that could be run as an actual SQL statement.
##### Option to add custom reviews
Users would be able to enter their own reviews on existing wines, or wines that aren’t already in the database.
##### Wine taster information (favorite wines, number of wines reviewed, etc.)
We originally wanted to do some sorting related to the wine tasters in our dataset. Since many of the ratings actually come from these people, it would cool to display their favorites and other information related to them.
##### The random selection allowed for duplicates
The procedure that drew random id’s was able to draw duplicates. In order to make things truly random, this should be fixed.

### Overall Reaction
We learned to be careful when including aggregate functions as fields. Grouping by a variable and corresponding aggregated variable does not allow you get the approrpiate fields other than the variables you grouped by and aggregated. For example, a query like “select variety, max(points), country from table group by variety” will give you correct maximum points per variety, however, it will not give you the correct country (or any other variables you included). This could only be achieved by select statements that included inner joins to provide the extra variables.

Don’t reinvent the wheel and think critically about using existing solutions. We wrote a lot of javascript that constructed the SQL for our search function, however, the whole time we could have used the CONCAT function in SQL. That said, people who suggested that on the Internet failed to mention that you should include spaces between each field you concatenate, otherwise there are edge cases that may count as a word when concatenated together. As our search function isn’t being used by many people, there isn’t a very likely chance that we’d experience this issue. However, an unlikely issue becomes an almost certainty when you have a large user base.
