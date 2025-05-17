---
title: "Distribution of the Daniel Morgan Trail System"
date: 2025-05-17T11:01:54-04:00
slug: 2025-05-17-distribution-of-the-dan
type: posts
---

About a month ago, I was speaking to [Liv from The Walking Spartan](https://walkingspartan.substack.com/) about, unsurprisingly, walkability and bikeability in our
city. In passing, they mentioned being interested in finding the distribution of
[the Dan](https://www.palspartanburg.org/the-dan) across our city council districts. The conversation moved on, but the idea sat with me for a while.

I've been sick for the past two days, so instead of working I thought it would be
fun to try to figure this out.

{{< toc >}}

## Results
Following our [inverted pyramid structure](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)), let's start with the results.

### Data
|   District | Council Person   |   Trail Length (miles) |   Percentage (%) |
|-----------:|:-----------------|-----------------------:|-----------------:|
|          1 | Meghan Smith     |                   0    |             0    |
|          2 | Rob Rain         |                   2.47 |            10.13 |
|          3 | Ruth Littlejohn  |                   2    |             8.19 |
|          4 | Jamie Fulmer     |                   4.03 |            16.52 |
|          5 | Janie Salley     |                   1.02 |             4.2  |
|          6 | Erica Brown      |                   2.2  |             9.02 |

### Map
{{< iframe "//umap.openstreetmap.fr/en/map/spartanburg-city-district-trails_1225351?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true" >}}

## Thoughts
Savvy readers may have noticed the percents don't add up to 100. Turns out about
51.93% (~12.67 miles) of the Dan are outside of the city entirely. You'll also notice
that District 1 currently has 0 miles of the Dan. According to [the plan](https://www.palspartanburg.org/files/files/The%20Dan%20Trail%20map%2003.01.2024.pdf)[^1] 
shared by PAL, there is future work planned that connects the Three Creeks 
Trail to Woodland Heights and the Wadsworth Trail.

Somewhat striking too is that District 4 contains 16.52% of the total trail system.
It'll be interesting to see how that changes as the trails get built. 

## Methodology
I won't get too technical here. If you want to dive deep, the code I wrote is on
[Github](https://github.com/MadhavRKumar/spartanburg-trails). The tricky part
of this was figuring out how to pull this data.

Both the [city of Spartanburg](https://www.cityofspartanburg.org/319/City-Council-Districts-Map)
and [PAL](https://experience.arcgis.com/experience/42b81a2040fe4bc49ff01a27972b0381/) have
interactive maps which means the data existed somewhere. Using my handy dandy 
"right-click inspect", I was able to track down the servers. Turns out, there are
[GIS servers](https://enterprise.arcgis.com/en/server/latest/get-started/windows/what-is-arcgis-for-server-.htm) that 
expose a basic REST API and [GeoPandas can read data directly from the URL](https://geopandas.org/en/stable/docs/reference/api/geopandas.read_file.html#geopandas.read_file). From there it was pretty straightforward to just calculate the length of 
trail within each district and divide it by the total length of the trail to get
each percentage.

I then output the results into a geojson file which I used to create the [interactive
map](https://umap.openstreetmap.fr/en/map/spartanburg-city-district-trails_1225351) embedded
above.


[^1]: The Dan Plan

