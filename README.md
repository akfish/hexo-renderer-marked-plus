# [Markdown] renderer

Add support for [Markdown]. This plugin uses [marked] as render engine.
This fork enables theme developer to have more control over generated HTML format.

## Override Marked Renderer

Marked has configurable renderer (do not confuse with Hexo's renderer) for custom HTML formating.
Theme developers can override marked renderer within a Hexo theme script:

```js
hexo.markedRenderer = {
  init: function() {
    // Called before rendering a post
  },
  heading: function(text, level) {
    // Default method can be accessed via:
    // this._super.heading(text, level)
    return "Your custom heading format"
  },
  eof: function() {
    // Called after marked finish rendering
    // Returned string will be appended to output HTML
    return '';
  }
}
```

For more information on how to override marked renderer, see [here](https://github.com/chjj/marked#overriding-renderer-methods)

## Install

``` bash
$ npm install hexo-renderer-marked-plus --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```

- **gfm** - Enables [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown)
- **pedantic** - Conform to obscure parts of `markdown.pl` as much as possible. Don't fix any of the original markdown bugs or poor behavior.
- **sanitize** - Sanitize the output. Ignore any HTML that has been input.
- **tables** - Enable GFM [tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables). This option requires the `gfm` option to be true.
- **breaks** - Enable GFM [line breaks](https://help.github.com/articles/github-flavored-markdown#newlines). This option requires the `gfm` option to be true.
- **smartLists** - Use smarter list behavior than the original markdown.
- **smartypants** - Use "smart" typograhic punctuation for things like quotes and dashes.

[Markdown]: http://daringfireball.net/projects/markdown/
[marked]: https://github.com/chjj/marked
