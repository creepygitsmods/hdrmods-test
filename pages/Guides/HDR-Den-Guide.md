---
title: [HDR Den Guide]
type: 
summary: 
description: Introduction to using HDR with ReShade
sidebar: false
---


# Welcome to the HDR Den!

The goal of this subreddit is to be one great big public resource for HDR, with a focus on video games. Whether you're on console or PC, looking for help with in-game HDR settings or looking for HDR mods, this will be the one stop shop for figuring out the best way you can experience HDR in a game.

# About HDR

HDR is an often misunderstood display technology, often thought of as being about scorching highlights and vibrant colors. This is only partially true, and in people's excitement for seeing mind blowing brightness and saturation, they often miss what HDR truly brings to the table. Ultimately, HDR is a container that allows for a great range of *detail.* In SDR, content is typically graded in a dark room at 100 nits peak brightness (a pretty dim output), which is an incredibly limited range to fit *a lot* of detail. Enter HDR, a standard that addresses numerous pain points of SDR (and brings some of its own). To keep it simple, with HDR we now have a standard capable of containing upwards of 10000 nits of brightness and pushing more vibrant colors, and it's capable of mapping 1:1 with your display...in the future, maybe.

HDR is a bit of a paradigm shift in how consumers interact with brightness on their screens, and this implicitly creates confusion. Previously, the viewer simply adjusts brightness based on preferences, and because the container of the content was smaller than the performance capabilities of the screen it just works. In HDR, the screen vastly underperforms the capabilities of the standard, which unfortunately burdens the viewer with the need to understand how their display performs. And aside from that, the standard can represent such a wide range of brightness that the concept of scaling it up and down at the display level stops making a ton of sense. So what does all this mean for your video games?

# Understanding Your HDR Environment

Your HDR screen is going to have very specific capabilities, and there are a couple points you should familiarize yourself with.

To start, I recommend checking [rtings.com](https://www.rtings.com/) for your specific display model. Check to make sure your screen is capable of a deep range of contrast. If it's an LCD, make sure it has Local Dimming with plenty of dimming zones. If it's an OLED, you're good to go. If your screen doesn't meet this criteria, I'm sorry but HDR is probably simply not worth using for you yet, as HDR without a deep contrast ratio tends to look less visually pleasing than sticking with SDR, even if there are benefits regarding detail retrieval.

If your screen is good to go, you'll now want to find out your screen's peak brightness. Search your relevant rtings review for the peak 2% window and take note of it (and while you're at it, you'll probably want to use whichever HDR mode/settings they recommend for gaming).

### HDR in Windows

99% of the time, to utilize HDR for games in Windows, you will need to have HDR enabled in your display settings (Right Click Desktop -> Display Settings -> HDR toggle). Enabling this setting will place all content, including SDR content, into an HDR container. SDR content brightness is determined by the SDR Content Brightness slider (Expand HDR option to find it). Each step on the slider corresponds to 4 nits of brightness, with a value of 0 being equal to 80 nits.

Additionally, you will want to run the HDR Calibration app. If you're on Windows 10 and don't have access to this, don't worry about it because very few games actually use it.

In summary:
- Enable HDR in Windows
- Adjust the SDR content slider to preference
    - 0 = 80 nits
    - 10 = 120 nits
    - 30 = 200 nits
- Run the HDR Calibration app, setting minimum luminance to 0, both luminance sliders to your peak, and saturation at default.

# Understanding HDR in Games

For now, we're going to live in a perfect world where games always do this right...

In many cases, HDR games provide two primary controls:

- Peak Brightness
- Paper White/Game Brightness

You will always want to __set your Peak Brightness to the value you found on rtings.com__.

For __Paper White/Game Brightness, this is ultimately a preference setting__, but with a catch. We're now bumping into that issue I mentioned, where the consumer's relationship with brightness changes. The higher you raise this value, the less dynamic range you will get. What this ultimately means is that there's a brightness ratio that is ideal to maintain in relation to your peak nits. Luckily there's a simple [paper white calculator](https://nikitamgrimm.github.io/hlg-reference-white-calc/) that can be used. Ignore the first section, and simply plug in your peak nits.

As mentioned, this is going to be a preference setting, the same way very few people view SDR in a dark room at 100 nits. But, it's worth understanding the relationship between your paper white setting and the detail actually visible on your screen! Ultimately the only wrong thing you can do is set it higher than your peak.

# HDR Analysis and Recommended Settings

A resident member of the subreddit, u/KoKlusz, has dedicated a lot of time and energy towards analyzing HDR in games and determining the best settings with heavy regard for creative intent, as determined by the SDR presentation. His analysis and recommendations are an absolutely invaluable tool, particularly for console players who are limited in what they can do to fix issues. Currently, he has three different resources for finding this information:

- [HDR Gaming Database (GitHub)](https://github.com/KoKlusz/HDR-Gaming-Database)
- [Google Spreadsheet (Mostly Discord Links)](https://docs.google.com/spreadsheets/d/1hXNXR5LXLjdmqhcEZI42X4x5fSpI5UrXvSbT4j6Fkyc/edit?gid=0#gid=0)
- A ton of posts in the [HDR Analysis thread](https://www.resetera.com/threads/hdr-games-analysed.23587/) on ResetEra.

# Common Issues with HDR in Games

- sRGB to 2.2 Gamma Mismatch
    - This is a problem that causes raised black levels compared to SDR. The origin of this is the SDR path in the game utilizing sRGB encoding while being developed and reviewed on monitors/TVs that decode as 2.2. When correctly converting their encoding into HDR, this mismatch in the art process becomes exposed, washing out the image. For developers, this can be fixed by switching to 2.2 encoding for your output in SDR, but only if it's setup this way during development. If the game is almost finished or already out, you can simulate this gamma mismatch to correct the HDR output. For the end user, this can be corrected with [Lilium's black floor fix for ReShade](https://github.com/EndlesslyFlowering/ReShade_HDR_shaders/releases)
- Brightness Scaling before tonemapping
    - Since most people do not use SDR at reference brightness, scaling up the brightness of the image is often desirable when converting to HDR. However, if you scale up the brightness before tonemapping, you will create noticeable shifts in the behavior of your tonemapper. To do this correctly, brightness should be scaled after tonemapping, and the peak brightness of your tonemapper should be scaled back proportionately. For the end user, if the peak brightness setting works, you can fix this by setting the in-game brightness adjustment to a neutral value, scaling up with [Lilium's HDR Brightness Adjustment](https://github.com/EndlesslyFlowering/ReShade_HDR_shaders/releases), and setting peak brightness to Peak / Linear Gain Factor.
- Non-adjustable peak brightness
- Different tonemappers or different tonemapping parameters between SDR and HDR
- Using Inverse Tonemapping instead of a proper HDR output
- SDR in an HDR container

# HDR Modding

As cool as HDR is, it's unfortunately fairly common for games to have broken, buggy, or downright unusable HDR implementations. Sometimes there are tonemapping missteps that cause colors to go radioactive in an implausible way, sometimes color grading from SDR is completely absent, sometimes they completely change tonemappers causing large artistic deviations, or sometimes it's not even "real" HDR. So what can we do about it?

### Native HDR Mods

If you're on PC, I've got great news for you: we currently live in a world with a very dedicated HDR modding scene, with **300+ fully playable mods**. These mods currently come in the form of two different "brands":

- RenoDX  
  - [Mods Page](https://github.com/clshortfuse/renodx/wiki/Mods)  
  - [Discord](https://discord.gg/QgXDCfccRy)

- Luma  
  - [Mods Page](https://github.com/Filoppi/Luma-Framework/wiki/Mods-List)  
  - [Discord](https://discord.gg/kFsCQvQQsm)

Both of these modding frameworks share similar goals: enable the devs to reverse engineer the shaders in games and rewrite them to support real, native HDR, ideally and typically with an eye for accuracy to the original creative intent. There are also a ton of mods that fix problems in games that already have HDR. Generally speaking, these mods are the definitive way to see these games.

The main difference between RenoDX and Luma is that Luma is designed for more extensive modding, and often carries with it additional features, such as custom DLSS implementations in games that previously lacked them. There's a lot of cross pollination between the two frameworks, and both offer extremely high quality HDR. I cannot recommend them enough.


### Inverse Tonemapping, i.e. AutoHDR

Inverse tonemapping (ITM) categorizes a type of HDR in which the SDR output is expanded to fit into an HDR container. This is a heavily compromised option, which will blowup UI brightness alongside game brightness, and is beholden to all the limits of the game's native SDR output. If the game is clipped in SDR, it will still be clipped with an ITM solution. As a result, ITM should be used with a full understanding that it is not real HDR, though many will still find it to be subjectively appealing. What ITM will get you is a perceptually expanded range of near-white SDR detail. While it is not actually more detailed, it can be perceived as such in specific situations.

ITM Options include:
- Microsoft's AutoHDR
- Nvidia's RTX HDR
- Special K
- ReShade .fx + Swapchain upgrade

All of these solutions face the same challenges, though Special K can upgrade rendering resources to help reduce banding (with a risk of breaking rendering). **In short, ITM should not be viewed as an equivalent replacement for native HDR.** It is in essence a last resort for people that dislike how SDR looks.

# Dispelling Common Myths about HDR

There's a lot of misinformation out there about what HDR is and isn't, so let's breakdown some of it.

- Console HDR and PC HDR are not different, and in almost all cases the games look identical between the two. The implementation is Windows is completely correct.
- Windows HDR at the desktop is not broken. 
    - This is a myth commonly propogated because of a mixture of people being used to uncalibrated SDR images, or people using very low end HDR screens that lack the dynamic range to properly represent an SDR image in HDR. HDR in Windows is color managed, meaning that SDR content is limited to bt709 colors (with some exceptions). A lot of gaming monitors run unclamped color gamuts, drastically oversaturing colors in SDR, leading to a perception that color is mishandled in HDR. The only issue with Windows HDR is Microsoft's simulation of an sRGB decode instead of a 2.2 decode, which causes SDR content to exhibit some black raise: a problem further exacerbated by low end HDR screens.
- Real HDR does not need to expand colors! HDR is simply a container capable of displaying greater color volume. It is up to the artists what the output looks like, and not all content calls for deeply saturated colors.
- Real HDR does not need to be super bright! Like with color, HDR is simply a container capable of displaying a wide range of luminance. HDR highlights are there when the content needs it, and it is up to the artist and, in the case of video games, the lighting engine.