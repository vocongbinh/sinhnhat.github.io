nhap=document.querySelector('.nhap .start')
// second=document.querySelector('.second')
text=document.querySelector('.na h1')
intro=document.querySelector('.intro')
appear=document.querySelector('.na')
transition=document.querySelector('.transition-img')
context=document.querySelector('.kontext')
nhap.addEventListener('click',(e)=>{
    intro.classList.add('hidden');
    context.classList.remove('hidden');
    type();
    
})
setInterval(()=>{
  text.classList.toggle('red');
}, 500)
var loiChuc='  chúc mừng sinh nhật'
var tocDo = 50;
var i = 0;
function type(){
    if(i <loiChuc.length){
document.querySelector('.loi_chuc').innerHTML +=loiChuc.charAt(i);
        i++;
        setTimeout(type,tocDo);
    }
}
window.kontext = function( container ) {

    // Dispatched when the current layer changes
    var changed = new kontext.Signal();
  
    // All layers in this instance of kontext
    var layers = Array.prototype.slice.call( container.querySelectorAll( '.layer' ) );
  
    // Flag if the browser is capable of handling our fancy transition
    var capable = 'WebkitPerspective' in document.body.style ||
            'MozPerspective' in document.body.style ||
            'msPerspective' in document.body.style ||
            'OPerspective' in document.body.style ||
            'perspective' in document.body.style;
  
    if( capable ) {
      container.classList.add( 'capable' );
    }
  
    // Create dimmer elements to fade out preceding slides
    layers.forEach( function( el, i ) {
      if( !el.querySelector( '.dimmer' ) ) el.innerHTML += '<div class="dimmer"></div>';
    } );
  
    /**
     * Transitions to and shows the target layer.
     *
     * @param target index of layer or layer DOM element
     */
    function show( target, direction ) {

      // Make sure our listing of available layers is up to date
      layers = Array.prototype.slice.call( container.querySelectorAll( '.layer' ) );
  
      // Flag to CSS that we're ready to animate transitions
      container.classList.add( 'animate' );
  
      // Flag which direction
      direction = direction || ( target > getIndex() ? 'right' : 'left' );
  
      // Accept multiple types of targets
      if( typeof target === 'string' ) target = parseInt( target );
      if( typeof target !== 'number' ) target = getIndex( target );
  
      // Enforce index bounds
      target = Math.max( Math.min( target, layers.length ), 0 );
  
      // Only navigate if were able to locate the target
      if( layers[ target ] && !layers[ target ].classList.contains( 'show' ) ) {
  
        layers.forEach( function( el, i ) {
          el.classList.remove( 'left', 'right' );
          el.classList.add( direction );
          if( el.classList.contains( 'show' ) ) {
            el.classList.remove( 'show' );
            el.classList.add( 'hide' );
          }
          else {
            el.classList.remove( 'hide' );
          }
        } );
  
        layers[ target ].classList.add( 'show' );
  
        changed.dispatch( layers[target], target );
  
      }
  
    }
  
    /**
     * Shows the previous layer.
     */
    function prev() {
  
      var index = getIndex() - 1;
      show( index >= 0 ? index : layers.length + index, 'left' );
  
    }
  
    /**
     * Shows the next layer.
     */
    function next() {
  
      show( ( getIndex() + 1 ) % layers.length, 'right' );
  
    }
  
    /**
     * Retrieves the index of the current slide.
     *
     * @param of [optional] layer DOM element which index is
     * to be returned
     */
    function getIndex( of ) {
  
      var index = 0;
  
      layers.forEach( function( layer, i ) {
        if( ( of && of == layer ) || ( !of && layer.classList.contains( 'show' ) ) ) {
          index = i;
          return;
        }
      } );
  
      return index;
  
    }
  
    /**
     * Retrieves the total number of layers.
     */
    function getTotal() {
  
      return layers.length;
  
    }
  
    // API
    return {
  
      show: show,
      prev: prev,
      next: next,
  
      getIndex: getIndex,
      getTotal: getTotal,
  
      changed: changed
  
    };
  
  };
  
  /**
   * Minimal utility for dispatching signals (events).
   */
  kontext.Signal = function() {
    this.listeners = [];
  }
  
  kontext.Signal.prototype.add = function( callback ) {
    this.listeners.push( callback );
  }
  
  kontext.Signal.prototype.remove = function( callback ) {
    var i = this.listeners.indexOf( callback );
  
    if( i >= 0 ) this.listeners.splice( i, 1 );
  }
  
  kontext.Signal.prototype.dispatch = function() {
    var args = Array.prototype.slice.call( arguments );
    this.listeners.forEach( function( f, i ) {
      f.apply( null, args );
    } );
  }
  
    
  
    
    
  
  // Create a new instance of kontext
  var k = kontext( document.querySelector( '.kontext' ) );
  
  
  // Demo page JS
  
  var bulletsContainer = document.body.querySelector( '.bullets' );
  
  //Create one bullet per layer
  for( var i = 0, len = k.getTotal(); i < len; i++ ) {
    var bullet = document.createElement( 'li' );
    bullet.className = i === 0 ? 'active' : '';
    bullet.setAttribute( 'index', i );
    bullet.onclick = function( event ) { 
        k.show( event.target.getAttribute( 'index' ) )
      };

    bullet.ontouchstart = function( event ) { k.show( event.target.getAttribute( 'index' ) ) };
    bulletsContainer.appendChild( bullet );
  }
  
  //Update the bullets when the layer changes
  k.changed.add( function( layer, index ) {
    var bullets = document.body.querySelectorAll( '.bullets li' );
    for( var i = 0, len = bullets.length; i < len; i++ ) {
      bullets[i].className = i === index ? 'active' : '';
    }
  } );
  var gallery = document.querySelector('#gallery');
  var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
  var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
  var resizeAll = function () {
      var altura = getVal(gallery, 'grid-auto-rows');
      var gap = getVal(gallery, 'grid-row-gap');
      gallery.querySelectorAll('.gallery-item').forEach(function (item) {
          var el = item;
          el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
      });
  };
  gallery.querySelectorAll('img').forEach(function (item) {
      // item.classList.add('byebye');
      if (item.complete) {
          console.log(item.src);
      }
      else {
          item.addEventListener('load', function () {
              var altura = getVal(gallery, 'grid-auto-rows');
              var gap = getVal(gallery, 'grid-row-gap');
              var gitem = item.parentElement.parentElement;
              gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
              // item.classList.remove('byebye');
          });
      }
  });
  window.addEventListener('resize', resizeAll);
  gallery.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {        
          item.classList.toggle('full');        
      });
  });
 var inputElement=document.getElementById('thank-input')
 console.log(inputElement);
 congra = document.querySelector('.congra');
 congra.addEventListener('drag',()=>{
  congra.style.bottom = '360px'

 })
 
 