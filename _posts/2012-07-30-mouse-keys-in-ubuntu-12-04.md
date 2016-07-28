---
layout: post
title: Mouse Keys in Ubuntu 12.04
author: Taylor Siviter
categories: ubuntu
---

Weirdly, on the iteration of Ubuntu 12.04, someone decided to remove a few settings by default
in the system settings menu. The accessibility feature, Mouse Keys, is still present under
*'System Settings &rarr; Universal Access'*.
However, without the removed options, it is no longer possible to easily change the acceleration
of the mouse. Ironically, this defeats the point of having Mouse Keys as an option at all as the
default values make the mouse dreadfully slow, cumbersome, and ultimately quite unusable.

### How to configure the acceleration of Mouse Keys in Ubuntu 12.04

A quick way of fixing this predicament is to install the xkbset package; which allows the
configuration of the XKEYBOARD extension. Open up your favourite terminal and type the
following to install the xkbset package:

```
sudo apt-get install xkbset
```

When the package is installed, a simple one-line command can then be used to configure the
acceleration. For example:

```
xkbset ma [delay] [interval] [time to max] [max speed] [curve]
```

For those new to command-line interfaces, the brackets need to be replaced by a numerical value
- tailored to your own taste of course. I have recently used the following for my configuration;
mess with the numbers until it best suits you.

```
xkbset ma 60 10 10 20 10
```

### Final Notes

Now that you have made mouse keys somewhat usable, other accessibility options can be tweaked
using the same package too. For the curious, simply use the following command to discover other
helpful tweaks and features:

```
xkbset help
```