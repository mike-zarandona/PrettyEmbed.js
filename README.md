# PrettyEmbed.js
Prettier embeds for your YouTubes - with nice options like high-res preview images, advanced customization of embed options, and optional [FitVids](http://fitvidsjs.com "FitVids") support.

[PrettyEmbed.js on GitHub](https://github.com/mike-zarandona/prettyembed.js)

[PrettyEmbed.js Demo on CodePen](http://codepen.io/mike-zarandona/full/FELxi/)



### Features
- Choose from one of eight thumbnail sizes
- Implement programmatically or via HTML5 `data-` attributes



## Getting Started

### Requirements
* [jQuery](http://jquery.com/)
* [waitForImages](https://github.com/alexanderdickson/waitForImages)


There are two methods of implementing PrettyEmbed.js - an HTML5 driven method, and a script driven method.

1. Include jQuery
2. Include waitForImages
2. On the `document.ready()` event, call the plugin

### HTML5 Driven Application
Form embeds by attaching the class of `.pretty-embed`, as well as any other required `data-pe-` options.

	<div class="pretty-embed" data-pe-videoid="aBcDeFg12345" data-pe-fitvids="true"></div>

Call the plugin

	$().prettyEmbed({ useFitVids: true });

### Script Driven
Create an HTML placeholder, such as this:

	<div id="my-video-display"></div>

Call the plugin on the placeholder element:

	$('#my-video-display').prettyEmbed({
		videoID: 'aBcDeFg12345',
		previewSize: 'hd',				// use either this option...
		customPreviewImage: '',			// ...or this option

		// Embed controls
		showInfo: false,
		showControls: true,
		loop: false,

		colorScheme: 'dark',
		showRelated: false,

		useFitVids: true
	)};

**Note** that html5 `data-pe-` attributes will take precedence over the options called programmatically.  E.g. `data-pe-videoid="aBcDeFg1234"` takes precedence over `options.videoID: '1234GfEdCbA'`.

**Also Note** that if a particular preview image size is loading a generic gray "three dots" image, YouTube might not have generated a thumbnail in this size.  Try a different size.



## Options
Name                   | Description
----                   | -----------
**videoID**            | The video ID of the YouTube video.  This option will be ignored if the `data-videoid` attribute is present.  (E.g.: *aBcDeFg12345*)
**previewSize**        | Preview image size pulled from YouTube.  This option will be ignored if the `customPreviewImage` attribute is present.  Available sizes from smallest to largest: `thumb-default`, `thumb-1`, `thumb-2`, `thumb-3`, `default`, `medium`, `high`, `hd` *(default)*
**customPreviewImage** |  Custom defined preview image URL. This option overrides `options.previewSize`.
**showInfo**           | Display video information (top bar).
**showControls**       | Display YouTube player controls.
**loop**               | Play video as a loop.
**colorScheme**        | Display YouTube player user interface.
**showRelated**        | Display YouTube related videos on video end.
**useFitVids**         | Call FitVids.js on `.pretty-embed` instances once the video(s) is/are loaded.



## Changelog

### v1.1.0
- Better multiple instance handling
- Fixed duplicate appended styles on multiple instances
- Better handling of mobile - this means that placeholders are not custom on mobile since YouTube does not allow for `autoplay=1` on mobile devices (boooo)
- Added option to choose preview image size pulled from YouTube
- Removed use of deprecated `.selector` property, which allowed for further minification and a cleaner application of the embedded CSS
- Fixed ugly default border on YouTube embeds
- Improved documentation

### v1.0.0
- Initial Release



## Thanks
Thanks to the contributors and suggestions from around the web ([@k-risc](https://github.com/k-risc))

Thanks to alexanderdickson for [waitForImages](https://github.com/alexanderdickson/waitForImages), which this plugin leverages for dynamic image previews.



## Author
[Mike Zarandona](http://mikezarandona.com "mikezarandona.com") | [@mikezarandona](http://twitter.com/mikezarandona "@mikezarandona")


![PrettyEmbed.js](http://mikezarandona.com/wp-content/uploads/2014/06/prettyembed-300x300.jpg)
