---
layout: post
title: Generating Fireflies with lampyridae.coffee
author: Taylor Siviter
categories: lampyridae
---

During the summer of 2016 I decided to simulate fireflies as a visual piece for my personal website; and as it transpired, it simultaneously lead to the progressive development of [lampyridae.coffee](https://siviter.xyz/portfolio/lampyridae/) &ndash; a lightweight CoffeeScript library that can be used to produce simple two-dimensional particle effects. As the namesake example of lampyridae.coffee, I thought I should elaborate on some of the aspects of mimicking Fireflies.

### The Colours of Firefly Bioluminescence

<span id="fig-1"></span>![Long exposure photograph of Fireflies](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/GluehwuermchenImWald.jpg/640px-GluehwuermchenImWald.jpg)
{: style="text-align: center;"}

**Figure 1**. A photograph of Fireflies in a forest near Nuremberg (30&nbsp;s exposure)&nbsp;[[1]](#ref-1).
{: style="text-align: center;"}

As can be seen in [figure&nbsp;1](#fig-1), in any quick Google [image search](https://www.google.co.uk/search?q=firefly+insect&tbm=isch), or even outdoors, the humble Firefly is an enchanting winged beetle that can produce a variety of colours from its natural bioluminescence. Depending on the species, this can range from an assortment of eerie greens to a small ensemble of almost golden yellows.

| <span id="table-1">Species</span>           | Peak Wavelength / nm |
|:-------------------------------------------:|:--------------------:|
| Pyrophorus plzgiophthalamus (dorsal organ)  | 543.0                |
| Photuris pennsylvanica                      | 552.4                |
| Diphotus sp.                                | 555.0                |
| Photuris jamaicensis                        | 555.0                |
| Photinus pardalus                           | 560.0                |
| Photinus pyralis                            | 562.1                |
| Photinus commissus                          | 564.0                |
| Photinus marginellus                        | 564.6                |
| Photinus pallens                            | 565.0                |
| Photinus xanthophotus ♀                     | 567.0                |
| Photinus leucopyge                          | 569.0                |
| Lecontea sp.                                | 570.0                |
| Photinus lobatus                            | 570.0                |
| Photinus evanescens                         | 570.0                |
| Photinus melanurus                          | 570.0                |
| Photinus nothus                             | 570.0                |
| Photinus (new species)                      | 570.0                |
| Photinus morbosus-ceratus                   | 571.0                |
| Photinus gracilobus                         | 572.0                |
| Photinus scintillans ♀                      | 574.8                |
| Photinus scintillans ♂                      | 575.1                |
| Pyrophorus pliophthalamus (ventral organ)   | 582.0                |

**Table 1**. The bioluminescent peak wavelengths from a sample of Firefly species&nbsp;[[2]](#ref-2).
{: style="text-align: center;"}

More quantitatively, the data from [table&nbsp;1](#table-1) can be used to show that the average peak wavelength emitted by this sample of species is 566.0&nbsp;nm with a three-sigma deviation of 26.2&nbsp;nm.
Presuming we can accept that the majority of peak wavelengths fall within this deviation either side of the average &ndash; a good sample would imply a 99.7% coverage of values &ndash; then we can approximate these as suitable bounds from which to draw random colours. In other words, this means that we have a range of 539.8-592.2&nbsp;nm from which we can select the colours of our Fireflies.

How do we convert these wavelengths of light to a computer readable colour code? There are a few methods of varying correctness; but as our values fall outside the purple region of the visible spectrum, one quick and approximate way is to consider these individual peaks as spectral &ndash; or more strictly as the dominant wavelengths from the bioluminescent spectra. This is an important assumption as a given spectrum may have many peak wavelengths but only one dominant wavelength; yet it is this latter quantity, together with its complementary, that forms our perception of hue&nbsp;[[3]](#ref-3).

<span id="fig-2"></span>![Hue scale](https://upload.wikimedia.org/wikipedia/commons/a/ad/HueScale.svg)
{: style="text-align: center;"}

**Figure 2**. Saturated hue scale in the HSB/HSL colour spaces. The unit of hue along the bottom is in degrees&nbsp;(°)&nbsp;[[4]](#ref-4).
{: style="text-align: center;"}

Using the above consideration in addition to assuming that all the colours are saturated, the dominant wavelength can now be approximated as a colour code by mapping the visible spectrum to the hue scale in [figure&nbsp;2](#fig-2). This can be done with the equation,

$$
\begin{equation}
  \text{hue} \approx h_{\text{S}}\bigg(\frac{\lambda_{\text{max}} - \lambda}{\lambda_{\text{max}}-\lambda_{\text{min}}}\bigg)
  \label{eq1}
\end{equation}
$$

where $$h_{\text{S}}$$ is the hue in degrees to use as a scaling factor, $$\lambda_{\text{max}}$$ the maximum wavelength of the visible spectrum, $$\lambda_{\text{min}}$$ the minimum wavelength of the visible spectrum, and $$\lambda$$ the wavelength to convert. To avoid the purple and repeating red region of the hue scale in [figure&nbsp;2](#fig-2), we will limit $$h_{\text{S}}$$ to the blue at 240 degrees. For the maximum and minimum wavelengths, I've selected the values of 650&nbsp;nm and 436&nbsp;nm respectively by comparing the approximate wavelengths of red and blue with their corresponding sRGB values and hues&nbsp;[[5]](#ref-5). Finally, after all of that, plugging these values into eq.$$\eqref{eq1}$$, along with the wavelength bounds from earlier, should give an approximate maximum hue of 123.55 and a minimum hue of 64.86.

In summary, an approximately valid colour can be used in construction of the Fireflies using a web legal HSL colour code and a random number from the range 64.86-123.55 &ndash; for example, `"hsl(72.3, 100%, 50%)"`. Of course, HSL is readily convertible to an RGB or hexadecimal code; both of which are supported by all major browsers.

### Firefly Class

As creating Fireflies was the original purpose of lampyridae.coffee, there is a specialised `Firefly` class descended from the standard `Particle` class already packaged within the library. Here is an edited extract from the library:

{% highlight coffeescript linenos %}
class Lampyridae.Firefly extends Lampyridae.Particle
  ### Construct and manage a Lampyridae firefly 'particle'.
  #
  # @param canvas [Object] Instance of Lampyridae.Canvas to attach the firefly to
  #
  # @option x [Number] Position of the firefly along the x-axis
  # @option y [Number] Position of the firefly along the y-axis
  # @option theta [Number] Direction of the firefly (radians anticlockwise from the x-axis)
  # @option speed [Number] Speed of the firefly
  # @option radius [Number] Radius of the firefly
  # @option alpha [Number] Opacity of the firefly
  # @option colour [Array] RGB Colour code array of the firefly - e.g. "[r, g, b]"
  # @option bound [String] Type of bounding [none|hard|periodic]
  ###
  constructor: (canvas, options) ->
    options ?= {}
    options.x ?= Lampyridae.rand 0, canvas.width()
    ... # More option setting goes here
    super(canvas, options)
  
  ### Firefly class prototype parameters.
  # Can be set by the user; e.g. Lampyridae.Firefly::radiusMax = 50, etc.
  ###
  speedMin: 1
  speedMax: 7
  radiusMax: 3.0
  radiusMin: 0.5
  turningAngle: 0.1 * Math.PI
  hueMax: 123.55 # Green
  hueMin: 64.86 # Yellowy
  saturation: '100%'
  lightness: '50%'
  opacity: 0.8
  bound: "hard"
  enableAlpha: true
  
  ### Random turn; set turngle angle to limit possibilities ###
  randomTurn: () -> @turn @turningAngle * (2.0 * Math.random() - 1.0)
  
  ### Random walk with respect to the bounds of the canvas and draw the Firefly ###
  update: () ->
    unless @applyBounds() then @randomTurn()
    @move()
    @draw()
{% endhighlight %}

Without overriding the default options, the construction of a `Firefly` sets a random parameter for each of the options specified in the comments; bounded by the prototype parameter members accessible to all instances of the class. This includes the selection of a random colour from the hue range calculated earlier. Other than specific parameter bounds; the `Firefly` child class quintessentially introduces a `randomTurn()` method that allows a restricted random walk to be simulated on each `update()` of the object. 

### Usage Example

Using this class is fairly simple. In a separate CoffeeScript file the following extract, when compiled, will create and animate 25 Fireflies by drawing them onto a newly generated `canvas` tag nested under the body element of a chosen document.

{% highlight coffeescript linenos %}
# Only the Canvas and base Particle classes are included by default
require 'particle/firefly'

# By default, if there is no existing canvas with the id 'world', this will
# attach '<canvas id="world"></canvas>' under the body element.
canvas = new Lampyridae.Canvas 'world'

Lampyridae.Firefly::speedMax = 5       # You can change proto parameters!
Lampyridae.Firefly::enableGlow = true  # Glow is not enabled by default
Lampyridae.Firefly::glowFactor = 4     # Default is 4; rerun if changed

total = 25                             # Number of fireflies to spawn
fireflies = []                         # For keeping track of the fireflies

# Reusable firefly creator - remember to tweak the total if reused.
do createFireflies = () ->
  for i in [0...total]
    firefly = new Lampyridae.Firefly canvas
    fireflies.push firefly

# An iterative update over the fireflies - remember to add it to the canvas!  
updateFireflies = () -> fireflies[i].update() for i in [0...total]

###
# Lights, camera, action!
###

canvas.addUpdate canvas.draw.clear     # If you want the screen to clear between frames
canvas.addUpdate updateFireflies       # Update all the fireflies every frame
canvas.animate()                       # Animate the canvas screen
{% endhighlight %}

### L'exemple on CodePen

Sometimes, the quickest way to understand any code is to see a demo of it in action; so here is an up-to-date version of the Firefly example on CodePen:

<p data-height="348" data-theme-id="0" data-slug-hash="mAVjzB" data-default-tab="result" data-user="siviter-t" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/siviter-t/pen/mAVjzB/">Generating Fireflies with lampyridae.coffee</a> by Taylor Siviter (<a href="http://codepen.io/siviter-t">@siviter-t</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### References

<span id="ref-1">[1]</span> Quit007. 2006. Photograph of Fireflies near Nuremberg. [[GFDL](http://www.gnu.org/copyleft/fdl.html), [CC-BY-SA-3.0](http://creativecommons.org/licenses/by-sa/3.0/) or [CC BY-SA 2.5-2.0-1.0](http://creativecommons.org/licenses/by-sa/2.5-2.0-1.0)]. URL: [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File%3AGluehwuermchenImWald.jpg).


<span id="ref-2">[2]</span> Seliger, H. H., and McElroy, W. D. 1964. The Colors of Firefly Bioluminescence: Enzyme Configuration and Species Specificity. Proceedings of the National Academy of Sciences of the United States of America, 52(1), 75–81. DOI: [10.1073/pnas.52.1.75](http://dx.doi.org/10.1073/pnas.52.1.75).

<span id="ref-3">[3]</span> Qi Yao, Jiaqi Ju, Rongqing Liang, Dahua Chen & Haitian Zhao. 2014.
Relationship between Peak Wavelength and Dominant Wavelength of Light Sources Based
on Vector-Based Dominant Wavelength Calculation Method, LEUKOS, 10(1), 11–18. DOI:
[10.1080/15502724.2013.833823](http://dx.doi.org/10.1080/15502724.2013.833823).

<span id="ref-4">[4]</span> Kalan. 2007. Hue scale image. [Public domain]. URL: [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File%3AHueScale.svg).

<span id="ref-5">[5]</span> Wikipedia. 2016. Spectral color. [Online]. URL: [en.wikipedia.org](https://en.wikipedia.org/wiki/Spectral_color)

<script type="text/x-mathjax-config">MathJax.Hub.Config({TeX:{equationNumbers:{autoNumber:"AMS"}}});</script>
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>