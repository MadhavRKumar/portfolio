---
title: "Spartanburg Place:Non-Place Ratio"
date: 2025-06-29T10:39:03-04:00
slug: 2025-06-29-spartanburg-place-non-place-ratio
type: posts
---

I recently read about [Places and Non-Places](https://www.strongtowns.org/journal/2014/10/14/places-and-non-places)
and thought it would be fun to try it out on Downtown Spartanburg.


{{< toc >}}

## Results

I calculated a Place:Non-Place ratio of **0.91:1** (47.55% place) for Downtown Spartanburg. This
shows slightly more land is used for Non-Places than Places as represented by [this map](https://umap.openstreetmap.fr/en/map/place-to-non-place_1244274):

{{< iframe "//umap.openstreetmap.fr/en/map/place-to-non-place_1244274?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true" >}}

## Caveats

First, a few caveats. This is a very rough estimate. I created the map using a combination
of hand-tracing and the [publicly available data of the parcels in Spartanburg](https://experience.arcgis.com/experience/5557d912e5fe42ab93c21d6eecf73123).[^1]
As a result, not all of the Places/Non-Places line up perfectly.

Additionally, I was not super strict with the definition of of Place and Non-Place. For example,
I designated the entirety of the County Courthouse as Place despite there being a fair
amount of empty lawn space there. I also did not distinguish between open and closed
businesses. 

I could have easily spent ages to make this perfect, but then I might 
not have ever actually finished. In the spirit of [incrementalism](https://www.strongtowns.org/journal/2018/9/5/incrementalism),
I figure let's start here and refine if needed.

## Thoughts

I am a little disappointed by this result. It shows that more than 50% of our downtown
area's land is occupied by Non-Places. The other side of this, however, is that it
shows we have a lot of opportunities to improve! I also know the city is currently 
in the process of making changes that will improve this. For example, the upcoming changes to
Daniel Morgan square will expand the Place area further. 

Hopefully we can use this analysis to help identify morea areas where we can start to incrementally convert
Non-Places to Places. More Places would also augment all the great work being done
by PAL on [the Dan](https://www.palspartanburg.org/the-dan). From a financial perspective,
there's also a huge potential gain in tax revenue from property and sales taxes that
we're missing out on by underusing our land!

This is also the densest area of our city which indicates the surrounding areas
will likely have much worse Place:Non-Place ratios. I would love for our city to
take steps to improve this. We could start by removing parking minimums entirely
for example. If we want to even be more radical, we could institute parking maximums.
I'd also love to see some creative adaptive reuse of some of the parking lots.

## Methodology

For the purposes of this project, I defined downtown as the area designated as
the "[Spartanburg Downtown Cultural District](https://www.spartanburgdowntown.com/spartanburg-downtown-cultural-district/)". 
In future iterations it might be fun to see how the results change based on other definitions of downtown.[^2]

I went through and traced out all of the parking lots and garages within that area in a Non-Place layer.
Then, I imported the data for parcels in that area from the City of Spartanburg Zoning map into a Place layer.[^3]
I moved any empty parcels over to the Non-Place layer and added unmarked Places like
Daniel Morgan Square and Wall Street to the Place layer. To account for parking spaces on parcels,
I subtracted the Non-Place polygons from the Place polygons to get the final Place area.

Subtracting the Place polygons from the base Cultural District polygon gives us 
all of the roads and areas like the greenspace near the railroads. Combining that with the
existing Non-Place polygons gives us our final Non-Place area.

We can then calculate the areas[^4] of the Culutral District, Places, and Non-Places
to get our ratios and percentages. The Python scipt is [here](https://github.com/MadhavRKumar/spartanburg-trails/blob/main/places-non-places.py).



[^1]: Also, shoutout to the City of Spartanburg for creating these interactive maps,
making them easily accessible, and keeping them up to date! It makes my life of being
a huge nerd so much easier.
[^2]: Originally, I mapped out my own definition. I asked my partner where they would
draw the boundaries of downtown and while we had some similarities there were enough
differences for me to seek out a more formal definition.
[^3]: Technical aside: It was quite an adventure to figure out how to convert the GeoJSON
data I yoinked from Google into a [geometry object](https://developers.arcgis.com/rest/services-reference/enterprise/geometry-objects/#polygon) format
required to apply a spatial filter to the query. 
[^4]: One more technical note: When calculating the [distribution of the Dan Trails](../2025-05-17-distribution-of-the-dan),
I used the [ESPG:32718](https://epsg.io/32718) reference system to get the length of the trails. In this case
we're calculating areas so we need to use an [equal-area projection](https://en.wikipedia.org/wiki/Equal-area_projection). 
I chose to use [ESPG:9822](https://epsg.io/9822). [All cartographic projections distort some distances](https://en.wikipedia.org/wiki/Theorema_Egregium#Elementary_applications) so different projections are required for different applications. I have a very rudimentary
understanding of all of this but I think it's so neat.

