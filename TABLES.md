# Tables We Will Use
[Our dataset](https://www.kaggle.com/zynicide/wine-reviews)
## Fields in full dataset: 
id, country, description, designation, points, price, province, region_1, region_2, taster_name, taster_twitter_handle, title, variety, winery

### 
Fields we will omit: region_2

## Tables

### location
location_id, country, province, region

### taster
taster_id, taster_name, taster_twitter_handle, image_src

### review
description, designation, points, price, variety, winery, vintage, FK location, FK taster

## Views
variety, vintage, description, points, price, country, taster_name

#### Vintage parsing

It would be helpful to have the vintage of the wine to display. In our starting dataset however, the vintage is contained in the ‘title’ field along with other information (most of which is redundant). Using regexp is necessary for extracting this information from almost 10k entries. The main thing to use is REGEXP_SUBSTR, which is analogous to the SUBSTR function, but with using regular expressions.

```SQL
select vintage from (select regexp_substr(title, '(19|[2][0])[[:digit:]]{2}') as vintage from wineReviews) as qwe;
```

The mess above is basically querying the title column, and matches 2 :digits: that are preceded either by ‘19’ or ‘20’. This extracts a four-digit number that falls within the constraints of 1900 - 2099. This column is entered into a new table, which I called 'temp'.

Now we must update our main table to have a column for our new field.

```SQL
alter table wineReviews add column vintage int;
```

Now, the tricky part. Updating the table is not as straightforward as setting values in table A to values in table B, where their id’s are equal. In MariaDB, you have to first JOIN the tables and then set the values.

```SQL
update wineReviews join temp on wineReviews.id = temp.id set wineReviews.vintage = temp.vintage;
```

