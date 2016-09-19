---
layout: post
title: Generating Fireflies with lampyridae.coffee
author: Taylor Siviter
categories: lampyridae
---
<script type="text/x-mathjax-config">MathJax.Hub.Config({TeX:{equationNumbers:{autoNumber:"AMS"}}});</script>
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"></script>

During the summer of 2016 I decided I wanted to simulate fireflies for my website and its development lead to lampyridae.coffee was the child of this example.

### The Colours of Firefly Bioluminescence

A quick Google [image search](https://www.google.co.uk/search?q=firefly+insect&tbm=isch) of Fireflies will show that this enchanting insect can produce a wide range of colours from its bioluminescence; from an eerie green to an almost golden yellow.

More here.

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

**Table 1**. The bioluminescent peak wavelengths from a sample of Firefly species&nbsp;[[1]](#ref-1).
{: style="text-align: center;"}

The data from [table&nbsp;1](#table-1) can be used to show that the average peak wavelength emitted by this sample of species is 566.0&nbsp;nm with a three-sigma deviation of 26.2&nbsp;nm.
Presuming we can accept that the majority of peak wavelengths fall within this deviation either side of the average &ndash; a good sample would imply a 99.7% coverage of values &ndash; then we can approximate these as suitable bounds from which to draw random colours. In other words, this means that we have a range of 539.8&ndash;592.2&nbsp;nm from which we can select the colours of our Fireflies.

How do we convert these wavelengths of light to a computer readable colour code? There are a few methods of varying correctness; but as our values fall outside the purple region of the visible spectrum, one quick and approximate way is to consider these individual peaks as spectral &ndash; or more strictly as the dominant wavelengths from the bioluminescent spectra. This is an important assumption as a given spectrum may have many peak wavelengths but only one dominant wavelength; yet it is this latter quantity, together with its complementary, that forms our perception of hue&nbsp;[[2]](#ref-2).

<span id="fig-1"></span>![Hue scale](https://upload.wikimedia.org/wikipedia/commons/a/ad/HueScale.svg)
{: style="text-align: center;"}

**Figure 1**. Saturated hue scale in the HSB/HSL colour spaces. The unit of hue along the bottom is in degrees&nbsp;(°)&nbsp;[[3]](#ref-3).
{: style="text-align: center;"}

Using the above consideration in addition to assuming that all the colours are saturated, the dominant wavelength can now be approximated as a colour code by mapping the visible spectrum to the hue scale in [figure&nbsp;1](#fig-1). This can be done with the equation,

$$
\begin{equation}
  \text{hue} \approx h_{\text{S}}\bigg(\frac{\lambda_{\text{max}} - \lambda}{\lambda_{\text{max}}-\lambda_{\text{min}}}\bigg)
  \label{eq1}
\end{equation}
$$

where $$h_{\text{S}}$$ is the hue in degrees to use as a scaling factor, $$\lambda_{\text{max}}$$ the maximum wavelength of the visible spectrum, $$\lambda_{\text{min}}$$ the minimum wavelength of the visible spectrum, and $$\lambda$$ the wavelength to convert. To avoid the purple and repeating red region of the hue scale in [figure&nbsp;1](#fig-1), we will limit $$h_{\text{S}}$$ to the blue at 240 degrees. For the maximum and minimum wavelengths, I've selected the values of 650&nbsp;nm and 436&nbsp;nm respectively by comparing the approximate wavelengths of red and blue with their corresponding sRGB values and hues&nbsp;[[4]](#ref-4). Finally, after all of that, plugging these values into eq.$$\eqref{eq1}$$, along with the wavelength bounds from earlier, should give an approximate maximum hue of 123.55 and a minimum hue of 64.86.

### L'exemple on CodePen

<p data-height="348" data-theme-id="0" data-slug-hash="mAVjzB" data-default-tab="result" data-user="siviter-t" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/siviter-t/pen/mAVjzB/">Generating Fireflies with lampyridae.coffee</a> by Taylor Siviter (<a href="http://codepen.io/siviter-t">@siviter-t</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### References

<span id="ref-1">[1]</span> Seliger, H. H., and McElroy, W. D. 1964. The Colors of Firefly Bioluminescence: Enzyme Configuration and Species Specificity. Proceedings of the National Academy of Sciences of the United States of America, 52(1), 75–81. DOI: [10.1073/pnas.52.1.75](http://dx.doi.org/10.1073/pnas.52.1.75).

<span id="ref-2">[2]</span> Qi Yao, Jiaqi Ju, Rongqing Liang, Dahua Chen & Haitian Zhao. 2014.
Relationship between Peak Wavelength and Dominant Wavelength of Light Sources Based
on Vector-Based Dominant Wavelength Calculation Method, LEUKOS, 10(1), 11–18. DOI:
[10.1080/15502724.2013.833823](http://dx.doi.org/10.1080/15502724.2013.833823).

<span id="ref-3">[3]</span> Kalan. 2007. Hue scale image. [Public domain]. URL: [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File%3AHueScale.svg).

<span id="ref-4">[4]</span> Wikipedia. 2016. Spectral color. [Online]. URL: [en.wikipedia.org](https://en.wikipedia.org/wiki/Spectral_color)
