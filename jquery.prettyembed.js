/*
**********************************************************
* prettyEmbed.js | https://github.com/mike-zarandona/prettyembed.js
* 
* Version:		v1.2.1
* Author:		Mike Zarandona
* Release:		July 31 2014
* 
* Reqs:			jQuery  |  http://jquery.com
* 				waitForImages  |  https://github.com/alexanderdickson/waitForImages
* 
* Optional:		FitVids.js  |  http://fitvidsjs.com
* 
* Usage:		$('#video-placeholder-element').prettyEmbed({
* 					videoID: 'aBcDeFg12345',
* 					previewSize: '',
* 					customPreviewImage: '',
* 
* 					showInfo: true,
* 					showControls: true,
* 					loop: false,
*					closedCaptions: false,
* 					colorScheme: 'dark',
* 					showRelated: false,
* 
* 					useFitVids: true
* 				});
**********************************************************
*/

(function ($, undefined) {
	$.fn.prettyEmbed = function (options) {

		// Override defaults with specified options
		options = $.extend({}, $.fn.prettyEmbed.options, options);

		// Test for mobile devices
		var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))? true : false;

		// Inject styles if not already present
		if ( $('#pretty-embed-style').length === 0 ) {
			var styles = $('<style />', {
				id:		'pretty-embed-style',
				html:	'.pretty-embed{position:relative;cursor:pointer;display:block}.pretty-embed img{width:100%;height:auto}.pretty-embed iframe{border:0 solid transparent}.pretty-embed:after{display:block;content:"";position:absolute;top:50%;margin-top:-19px;left:50%;margin-left:-27px;width:54px;height:38px;background-image:url(data:image/png;base64,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);-webkit-background-size:cover;background-size:cover}.pretty-embed.play:after{display:none}.pretty-embed:hover:after{background-image:url(data:image/png;base64,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)}'
			}).appendTo('head');
		}

		// Error Checking
		if (options.useFitVids) {
			if (!$.isFunction($.fn.fitVids)) {
				console.error('PrettyEmbed.js Error:  options.useFitVids is set to true; FitVids not found!');
			}
		}

		// Store $('this') in a variable to minimize DOM searches
		var elem;

		// if no selector, only fire on .pretty-embed
		if ( $(this).length === 0 ) { elem = $('.pretty-embed'); }
		else { elem = $(this); }

		// Main setup loop
		elem.each(function() {

			// Tag the selected elements
			$(this).addClass('pretty-embed');

			var $newDOMElement,
				thisVideoID = '',
				thisPreviewSize = '',
				thisCustomPreviewImage = '',
				thisShowInfo,
				thisShowControls,
				thisLoop,
				thisClosedCaptions,
				thisLocalization,
				thisColorScheme,
				thisShowRelated,
				thisAllowFullScreen,
				fullScreenFlag;

			// videoID
			if ( $(this).attr('data-pe-videoid') !== undefined ) { thisVideoID = $(this).attr('data-pe-videoid'); }
			else if ( $(this).attr('href') !== undefined ) { thisVideoID = youtube_parser( $(this).attr('href') ); }
			else { thisVideoID = options.videoID; }

			// previewsize
			if ( $(this).attr('data-pe-preview-size') !== undefined ) { thisPreviewSize = $(this).attr('data-pe-preview-size'); }
			else if ( options.previewSize !== undefined ) { thisPreviewSize = options.previewSize; }
			else { thisPreviewSize = undefined; }

			// custom placeholder
			if ( $(this).attr('data-pe-custom-preview-image') !== undefined ) { thisCustomPreviewImage = $(this).attr('data-pe-custom-preview-image'); }
			else if ( options.customPreviewImage !== undefined ) { thisCustomPreviewImage = options.customPreviewImage; }
			else { thisCustomPreviewImage = undefined; }

			// showinfo
			if ( $(this).attr('data-pe-show-info') !== undefined ) { thisShowInfo = $(this).attr('data-pe-show-info'); }
			else if ( options.showInfo !== undefined ) { thisShowInfo = options.showInfo; }
			else { thisShowInfo = undefined; }

			// show controls
			if ( $(this).attr('data-pe-show-controls') !== undefined ) { thisShowControls = $(this).attr('data-pe-show-controls'); }
			else if ( options.showControls !== undefined ) { thisShowControls = options.showControls; }
			else { thisShowControls = undefined; }

			// loop
			if ( $(this).attr('data-pe-loop') !== undefined ) { thisLoop = $(this).attr('data-pe-loop'); }
			else if ( options.loop !== undefined ) { thisLoop = options.loop; }
			else { thisLoop = undefined; }

			// closed captions
			if ( $(this).attr('data-pe-closed-captions') !== undefined ) { thisClosedCaptions = $(this).attr('data-pe-closed-captions'); }
			else if ( options.closedCaptions !== undefined ) { thisClosedCaptions = options.closedCaptions; }
			else { thisClosedCaptions = undefined; }

			// localization
			if ( $(this).attr('data-pe-localization') !== undefined ) { thisLocalization = $(this).attr('data-pe-localization'); }
			else if ( options.localization !== undefined ) { thisLocalization = options.localization; }
			else { thisLocalization = undefined; }

			// color scheme
			if ( $(this).attr('data-pe-color-scheme') !== undefined ) { thisColorScheme = $(this).attr('data-pe-color-scheme'); }
			else if ( options.colorScheme !== undefined ) { thisColorScheme = options.colorScheme; }
			else { thisColorScheme = undefined; }

			// show related
			if ( $(this).attr('data-pe-show-related') !== undefined ) { thisShowRelated = $(this).attr('data-pe-show-related'); }
			else if ( options.showRelated !== undefined ) { thisShowRelated = options.showRelated; }
			else { thisShowRelated = undefined; }

			// allow full screen
			if ( $(this).attr('data-pe-allow-fullscreen') !== undefined ) { thisAllowFullScreen = $(this).attr('data-pe-allow-fullscreen'); }
			else if ( options.allowFullScreen !== undefined ) { thisAllowFullScreen = options.allowFullScreen; }
			else { thisAllowFullScreen = undefined; }


			// If this element is an <a/>, create a placeholder replacement
			if ( $(this).is('a') ) {

				// build the DOM structure
				$newDOMElement = $('<div />').addClass('pretty-embed');

				// rebuild the data-pe- attributes
				$newDOMElement.attr('data-pe-videoid', thisVideoID)
							  .attr('data-pe-preview-size', thisPreviewSize)
							  .attr('data-pe-custom-preview-image', thisCustomPreviewImage)
							  .attr('data-pe-show-info', thisShowInfo)
							  .attr('data-pe-show-controls', thisShowControls)
							  .attr('data-pe-loop', thisLoop)
							  .attr('data-pe-closed-captions', thisClosedCaptions)
							  .attr('data-pe-localization', thisLocalization)
							  .attr('data-pe-color-scheme', thisColorScheme)
							  .attr('data-pe-show-related', thisShowRelated)
							  .attr('data-pe-allow-fullscreen', thisAllowFullScreen);

				// append the new element, and remove the <a/>
				$(this).after($newDOMElement);
			}

			// Write the options.customPreviewImage OR choose a size
			if ( thisCustomPreviewImage !== undefined && thisCustomPreviewImage !== '' ) {
				$(this).html('<img src="' + thisCustomPreviewImage + '" width="100%" alt="YouTube Video Preview" />');
			}
			else {
				var previewSizePrefix = '';

				switch (thisPreviewSize) {
					case 'thumb-default':
						previewSizePrefix = 'default';
						break;
					case 'thumb-1':
						previewSizePrefix = '1';
						break;
					case 'thumb-2':
						previewSizePrefix = '2';
						break;
					case 'thumb-3':
						previewSizePrefix = '3';
						break;
					case 'default':
						previewSizePrefix = 'mqdefault';
						break;
					case 'medium':
						previewSizePrefix = '0';
						break;
					case 'high':
						previewSizePrefix = 'hqdefault';
						break;
					default:	// 'hd' or max-resolution quality
						previewSizePrefix = 'maxresdefault';
						break;
				}

				// Write the <img/> element
				$(this).html('<img src="//img.youtube.com/vi/' + thisVideoID + '/' + previewSizePrefix + '.jpg" width="100%" alt="YouTube Video Preview" />');
			}

			if ( $(this).is('a') ) {
				$newDOMElement.html( $(this).html() );
				$(this).remove();
			}

			// if mobile, go straight to iframe
			if (mobile) {
				$(window).on('load', function() {
					$('.pretty-embed').trigger('click');
				});
			}
		});



		// Click handler: load the video
		$('body').on('click', '.pretty-embed', function(e) {
			e.preventDefault();

			clickEventRunner( $(this) );
		});



		/**
		 * Function: clickEventRunner(obj)
		 * Contains the functionality for .on('click') events
		 * obj = the current object referenced passed from $(this)
		 */
		function clickEventRunner(obj) {
			var wrapperWidth = obj.find('img').outerWidth(true),
				wrapperHeight = obj.find('img').outerHeight(true),
				playerOptions = '',
				thisVideoID = '';

			// videoid - set from data-pe- attribute or options
			if ( obj.attr('data-pe-videoid') !== undefined ) { thisVideoID = obj.attr('data-pe-videoid'); }
			else if ( options.videoID !== undefined ) { thisVideoID = options.videoID; }
			else {
				thisVideoID = undefined;
				console.error('PrettyEmbed.js Error:  Misformed or missing video ID.');
			}


			// Assemble the player options string
			// showInfo
			if ( (obj.attr('data-pe-show-info') === 'false') || (options.showInfo === false) ) { playerOptions += '&showinfo=0'; }

			// showControls
			if ( (obj.attr('data-pe-show-controls') === 'false') || (options.showControls === false) ) { playerOptions += '&controls=0'; }

			// loop
			if ( (obj.attr('data-pe-loop') === 'true') || (options.loop === true) ) { playerOptions += '&loop=1'; }

			// closed captions
			if ( (obj.attr('data-pe-closed-captions') === 'true') || (options.closedCaptions === true) ) { playerOptions += '&cc_load_policy=1'; }

			// localization
			if ( (obj.attr('data-pe-localization') !== undefined) || (options.localization !== undefined) ) {
				if ( obj.attr('data-pe-localization') !== undefined ) {
					playerOptions += '&hl=' + obj.attr('data-pe-localization');
				}
				else if ( options.localization !== undefined ) {
					playerOptions += '&hl=' + options.localization;
				}
			}

			// colorScheme
			if ( (obj.attr('data-pe-color-scheme') == 'light') || (options.colorScheme == 'light') ) { playerOptions += '&theme=light'; }

			// showRelated
			if ( (obj.attr('data-pe-show-related') === 'false') || (options.showRelated === false) ) { playerOptions += '&rel=0'; } else { playerOptions += '&rel=1'; }

			// allow full screen
			if ( (obj.attr('data-pe-allow-fullscreen') === 'false') || (options.allowFullScreen === false) ) { fullScreenFlag = ''; } else { fullScreenFlag = 'allowfullscreen '; }

			// Write the YouTube video iFrame into the element at the exact dimensions it is now
			obj.html('<iframe width="' + wrapperWidth + '" height="' + wrapperHeight + '" ' + fullScreenFlag + 'style="border:none;" src="//www.youtube.com/embed/' + thisVideoID + '?autoplay=1' + playerOptions + '"></iframe>')
				// Remove the YouTube 'play' button using a CSS class
				.addClass('play');

			// If we're using FitVids, call it now
			if (options.useFitVids) {
				if ( $.isFunction($.fn.fitVids) ) {
					obj.parent().fitVids();
				}
			}
		}



		// Helper function: get video ID from youtube URLs
		function youtube_parser(url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match && match[7].length == 11) {
				return match[7];
			} else {
				console.error('PrettyEmbed.js Error:  Bad URL.');
			}
		}



		// Default the defaults
		$.fn.prettyEmbed.options = {
			videoID: '',
			previewSize: '',
			customPreviewImage: '',

			// Embed controls
			showInfo: true,
			showControls: true,
			loop: false,
			closedCaptions: false,

			colorScheme: 'dark',
			showRelated: false,

			// FitVids.js
			useFitVids: false
		};
	};
})(jQuery);
