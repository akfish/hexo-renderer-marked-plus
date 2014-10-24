var marked = require('marked'),
  _ = require('lodash'),
  util = hexo.util,
  highlight = util.highlight,
  htmlTag = util.html_tag,
  format = util.format,
  stripHtml = format.stripHtml,
  headingId = {};

var anchorId = function(str){
  return str
    .replace(/\s+/g, '_')
    .replace(/\./g, '-')
    .replace(/-{2,}/g, '-');
};

var DefaultRenderer = marked.Renderer;

// Add id attribute to headings
DefaultRenderer.prototype.heading = function(text, level){
  var id = anchorId(stripHtml(text));

  // Add a number after id if repeated
  if (headingId.hasOwnProperty(id)){
    id += '-' + headingId[id];
    headingId[text]++;
  } else {
    headingId[id] = 1;
  }

  return htmlTag('h' + level, {id: id}, text) + '\n';
};

DefaultRenderer.override = function (prop) {
  if (prop == null || typeof(prop) != 'object') {
    console.log("Use default renderer");
    return DefaultRenderer;
  }
  console.log("Use overrided renderer")
  var overrided = function () { DefaultRenderer.call(this); }
  overrided.prototype = _.create(DefaultRenderer.prototype, _.assign({
    '_super': DefaultRenderer.prototype,
    'constructor': overrided
  }, prop));
  return overrided;
}

var Renderer = DefaultRenderer;//.override(hexo.markedRenderer);

marked.setOptions({
  langPrefix: '',
  highlight: function(code, lang){
    return highlight(code, {lang: lang, gutter: false, wrap: false});
  }
});

var initialized = false;

var renderer = function(data, options){
  headingId = {};
  if (!initialized) {
    Renderer = DefaultRenderer.override(hexo.markedRenderer);
    initialized = true;
  }
  var r = new Renderer();

  if (typeof(r.init) == 'function') {
    r.init();
  }

  var html = marked(data.text, _.extend({
    renderer: r,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true
  }, hexo.config.marked, options));

  if (typeof(r.eof) == 'function') {
    html += r.eof();
  }
  return html;
};

hexo.extend.renderer.register('md', 'html', renderer, true);
hexo.extend.renderer.register('markdown', 'html', renderer, true);
hexo.extend.renderer.register('mkd', 'html', renderer, true);
hexo.extend.renderer.register('mkdn', 'html', renderer, true);
hexo.extend.renderer.register('mdwn', 'html', renderer, true);
hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
hexo.extend.renderer.register('mdtext', 'html', renderer, true);
