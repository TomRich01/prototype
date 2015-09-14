function twentyfour_gallery (selector, options){
  this.slides = [];
  this.templates = {
    gallery:null,
    stage:null,
    media_bar:null
  };

  this.settings = {
    fullscreen_icon_class:"icon-screen-full",
    play_icon_class: "icon-playback-play",
    pause_icon_class:"icon-playback-pause",
    nav_left_icon_class:"icon-angle-left",
    nav_right_icon_class:"icon-angle-right",
    toggle_tray_icon_class:"icon-th",
    gallery_template_selector:"#nexus_gallery_template",
    tray_template_selector:"#nexus_gallery_tray_template",
    media_bar_template_selector:"#nexus_gallery_media_bar_template",
    stage_template_selector:"#nexus_gallery_stage_template",
    query_selector: ".nexus.gallery"
  };

  this.go_to_slide = function(index){
    alert(index);
  };
  this.add_event_listeners = function(){
    window.test = $(this.element);
    console.debug(test);
    $(this.element).find('.action_area.nav.left').click(function(){
      //this.go_to_slide(1);
    });
  };

  this.generate_slides = function(){
    var slides = '';
    for(var i=0; i<this.slides.length; i++){
      slides += $(this.slides[i])[0].outerHTML;
    }
    return slides;
  };

  this.update_settings = function(settings){
    $.extend(this.settings, settings);
  };

  this.update_templates = function(data){

    data = data || {};
    data.slides = this.generate_slides();
    $.extend(data, this.settings);

    this.templates.stage     = nexus.get_template(this.settings.stage_template_selector);
    this.templates.stage     = nexus.parse_template(this.templates.stage, data);
    data.stage               = this.templates.stage;

    this.templates.tray      = nexus.get_template(this.settings.tray_template_selector);
    this.templates.tray      = nexus.parse_template(this.templates.tray, data);
    data.tray                = this.templates.tray;

    this.templates.media_bar = nexus.get_template(this.settings.media_bar_template_selector);
    this.templates.media_bar = nexus.parse_template(this.templates.media_bar, data);
    data.media_bar                    = this.templates.media_bar;

    this.templates.gallery   = nexus.get_template(this.settings.gallery_template_selector);
    this.templates.gallery   = nexus.parse_template(this.templates.gallery, data);
  };

  this.init = function(selector){
      var candidates = $(selector);
      gallery = this;
      $(candidates).each(function(){
        gallery.element = $(this);
        var slides = $(this).find(".slide");
        $(slides).each(function(index){
          gallery.slides[index] = $(this);
        });
        gallery.update_templates();
        //gallery.element = $(gallery.element).replaceWith(gallery.templates.gallery).html();
        $(gallery.element).html(gallery.templates.gallery);
        console.debug(gallery.element);

        //gallery.add_event_listeners();

      });
      return this.element;
  }.bind(this);

  selector = selector || ".gallery24";
  return this.init(selector);
}
