---
title: "Spartanburg City Crash Rate Analysis"
date: 2025-07-27
slug: 2025-07-27-collision-analysis
type: posts
tags:
  - urbanism
  - gis
---

About a month ago, I wrote [a post analyzing the Place:Non-Place ratio of Downtown Spartanburg](../2025-06-29-spartanburg-place-non-place-ratio).
Much to my surprise, it was posted on the [Spartanburg subreddit](https://www.reddit.com/r/Spartanburg/comments/1luxi0t/a_local_guy_mapped_how_much_of_downtown/)
and people found it interesting!

I do this out of my own curiousity and desire to solve problems for fun. The fact that I can
connect to others through that is a delightful cherry on top. 

To the matter at hand. As I was finding the data for that last post, I stumbled
upon SCDOT road data. I had recently read about the [Strong Towns Crash Analysis Studio](https://www.strongtowns.org/crashmodel)
and wondered if I could use my burgeoning GIS skills to do something similar for the roads 
within Spartanburg City limits. If we can identify places that have a crazy
high number of crashes, then we can prioritize fixing them and making our city safer!
Should be pretty straightforward right?[^1]

One month, a thousand of rabbit holes, and dozens of hours of reading DOT documents later,
I present you with my findings and their many limitations.

{{< toc >}}

## Results

You can play with the all of the data in this interactive [map](/spartanburg_roads_with_collisions.html):

{{< map "spartanburg_roads_with_collisions.html" >}}

The map shows the crash rates for road segments and intersections in Spartanburg from 2017 to 2021. 
This was the only [publicly available data](https://scdps.maps.arcgis.com/apps/mapviewer/index.html?layers=52ae3a22b72740a29b9d7e98d4b395fc) I could find from the South Carolina Department of Public Safety (SCDPS). 

Roads and intersections are separated because we calculate crash rate differently with different resulting units.
For road segments, [this formula](https://highways.dot.gov/safety/local-rural/roadway-departure-safety-manual-local-rural-road-owners/appendix-c-crash-rate) gives
us a result in crashes per 100 million vehicle-miles traveled. For our calculations, I chose to use 1 million vehicle-miles traveled instead.

For intersections, [this formula](https://highways.dot.gov/safety/local-rural/intersection-safety-manual-local-rural-road-owners/3-safety-analysis) give us
crashes per 1 million entering vehicles.

Both of these results are proportional to traffic volume. This is important because
the number of crashes alone does not tell us much. We'd expect a road like Church Street to have
way more crashes than something like Spring Street because there's way more traffic.
So what we're interested in are places that have a high proportion of crashes relative
to how many cars travel there. This indicates potential problem areas to investigate further.

The following tables are the top 10 roads and intersections by crash rate. I set a threshold
of 5 crashes for this table in an attempt to reduce overrepresentation of infrequently traveled roads.
There are better approaches to this, but I'll touch on that later.

I love a visual aid so I also linked to a Google street view for each road and intersection. 

Primary Factors shows the most commonly reported cause of crashes for each location. I'll touch more
on the limitations of this later as well.

### Roads
| Name             |   Crash Rate |   Crashes | Primary Factors                                                                                                                                |
|:-----------------|-----------------------------:|-------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| [OLIVER ST](https://maps.app.goo.gl/s3LYRgzJTphLB4n99)        |                       187.87 |            6 | Distracted/Inattention (33.33%)                                                                                                                |
| [MAGNOLIA ST](https://maps.app.goo.gl/1YmLxWE6sz9g2seD8) (St. John to Main)     |                       166.04 |           11 | Distracted/Inattention (36.36%)                                                                                                                |
| [GARNER RD](https://maps.app.goo.gl/XARZkWJEoAU8tpK67)       |                       163.57 |           35 | Failed to Yield Right of Way (40.00%)                                                                                                          |
| [E MAIN ST](https://maps.app.goo.gl/sP7mMp393vxuuLPu7) (Church to Liberty)        |                       145.19 |           23 | Distracted/Inattention (34.78%)                                                                                                                |
| [IMPERIAL DR](https://maps.app.goo.gl/o2aZRA6qUgpE8Ke8A)[^2]      |                       119.12 |           15 | Distracted/Inattention (26.67%)<br/>Other Improper Action (26.67%)                                                                             |
| [FREMONT AVE](https://maps.app.goo.gl/uXmtWuAVK5MXYvEu7)      |                       113.86 |           12 | Other Improper Action (16.67%)<br/>Failed to Yield Right of Way (16.67%)<br/>Distracted/Inattention (16.67%)<br/>Followed Too Closely (16.67%) |
| [DORMAN CENTRE DR](https://maps.app.goo.gl/mqM7iMBqUF98XyEK9) |                       110.42 |           32 | Failed to Yield Right of Way (25.00%)                                                                                                          |
| [PEACHSHED RD](https://maps.app.goo.gl/AzAaRqAHTwnWBxZx5)     |                       109.59 |            6 | Other Improper Action (33.33%)                                                                                                                 |
| [NORRIS ST](https://maps.app.goo.gl/41B2wkBpe86qGGF76)        |                        98.25 |           13 | Distracted/Inattention (38.46%)                                                                                                                |
| [BEE ST](https://maps.app.goo.gl/gCfr9HsVqoxX7cBs8)           |                        93.93 |            6 | Distracted/Inattention (50.00%)                                                                                                                |

### Intersections
| Name                                             |   Crash Rate |   Crashes | Primary Factors                                                                      |
|:-------------------------------------------------|-------------:|-------------:|:-------------------------------------------------------------------------------------|
| [DORMAN COMMERCE DR, DORMAN CENTRE DR](https://maps.app.goo.gl/TSPzPXtbomTatVs36)             |        35.62 |           26 | Failed to Yield Right of Way (80.77%)                                                |
| [BRAWLEY ST, COLLEGE ST](https://maps.app.goo.gl/MgUFMomYyEwjzzBq9)                           |        15.34 |            7 | Failed to Yield Right of Way (28.57%)<br/>Disregarding Signs, Signals, etc. (28.57%) |
| [DUNCAN ST, S CONVERSE ST](https://maps.app.goo.gl/mS8SYX4s7TjEDyLF7)                         |         6.05 |            8 | Failed to Yield Right of Way (75.00%)                                                |
| [FARLEY AVE, ARCH ST](https://maps.app.goo.gl/2jkuhByLvZXdQsjv9)                              |         3.81 |           33 | Failed to Yield Right of Way (78.79%)                                                |
| [S FOREST ST, W HENRY ST](https://maps.app.goo.gl/iNwv7ipdFFte75Fx9)                          |         3.25 |           38 | Failed to Yield Right of Way (60.53%)                                                |
| [S CONVERSE ST, HUDSON L BARKSDALE BLVD, E LEE ST](https://maps.app.goo.gl/hUT3RLrJjaHdvDEc9) |         2.23 |           11 | Failed to Yield Right of Way (63.64%)                                                |
| [COLLINS AVE, REV W L WILSON DR, HIGH ST](https://maps.app.goo.gl/B7SCsjMtCqFswBMv5)          |         2.07 |           10 | Failed to Yield Right of Way (70.00%)                                                |
| [E KENNEDY ST, S DEAN ST](https://maps.app.goo.gl/gbc4oh28RsGK66Sz9)                          |         1.98 |           16 | Failed to Yield Right of Way (68.75%)                                                |
| [HUDSON L BARKSDALE BLVD, MARION AVE](https://maps.app.goo.gl/AC6wtdVYg4gB2kSdA)              |         1.72 |            9 | Disregarding Signs, Signals, etc. (33.33%)                                           |
| [CRESCENT AVE, S IRWIN AVE, S FOREST ST](https://maps.app.goo.gl/39JJyZivt6euUvNV9)           |         1.62 |           26 | Failed to Yield Right of Way (50.00%)                                                |
## Limitations
There are a LOT of limitations to these results. First off, the collision data is from 2017-2021.
Spartanburg has changed a lot in the last four years, which includes a lot of road work. 
Changes to traffic flow caused by Morgan Square closing in 2020 are not well accounted for either.

The traffic volume data itself is also suspect for the non-state maintained roads. 
I pulled this from [SCDOT](https://scdot.maps.arcgis.com/apps/MinimalGallery/index.html?appid=46c03d924c774cdca90912a60d758438).
It's likely that annual average daily traffic (AADT) for non-state roads
were estimated based on their functional class. This is totally understandable given
it's non-trivial to measure and unrealistic to expect accurate counts for every single road.
Nonethesless, improving the accuracy of that data[^3] where we can would give us a better understanding.

Crash rate as a metric has some limitations as well. This gets pretty technical so you can read
more about it [here](https://highways.dot.gov/safety/learn-safety/road-safety-fundamentals-html-version/unit-4-solving-safety-problems).
The basic idea is that instead of only looking at historical data, engineers
build models to predict the number of crashes for a given set of characterstics like number of lanes,
shoulder width, type of median, etc. They compare this to the observed number of crashes
to help determine prioritization. This avoids the problem of overprioritizing roads
that are on the extremes of traffic volume that I touched on eariler.

That is WAY outside of my area of expertise. It also requires access to data that,
as far as I can tell, is not available. I did find [a report](https://scltap-scdot.s3.amazonaws.com/documents/SPR-712-Final-Report.pdf)
that did a lot of the work already. Someone who is an actual expert in this matter
could probably combine these results.

Finally, the "Primary Factor" is determined by officers at the time of the crash.
As a result, we should take this with a grain of salt since it is a somewhat subjective
judgement call. The reported primary factor almost always puts the onus of crash
onto the drivers themselves. I strongly disagree with this framing.

In the case of Garner Rd, 14 out of 35 (40%) of the reported collisions were caused by "Failed to Yield Right of Way".
If different people keep making the same mistake when using something then maybe
the problem isn't the people. Maybe the thing is just poorly designed.

## Conclusion
This post has gotten long so I'll skip on the methodology for now. The code and a zip file
containing the road and collision data are [here](https://github.com/MadhavRKumar/spartanburg-trails) if you're interested in digging deeper.

I would refrain from making any hard conclusions from this due to the limitations we've discussed.
My hope though is that this is a good place to start. One step of many to a stronger,
safer, better Spartanburg.


[^1]: In municipal buildings all across the country, traffic engineers scoff at my arrogance.
[^2]: I was unable to get a street view directly on the road so had to settle for the nearby Norris street where you can see Imperial.
[^3]: And make it easily publicly accessible please
