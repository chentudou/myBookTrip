const DEFAULT_CONFIG = {
    key: null,
    v: '3',
    language: null,
    callback: 'googleMapInit'
  }
  
  class ggMapLoader {
    constructor(config) {
      this.config = {
        ...DEFAULT_CONFIG,
        ...config
      };
      this._window = window;
      this._document = document;
      this._scriptLoaded = false;
    }
    load() {
      if (this._window.google) 
        return Promise.resolve();
      if (this._scriptLoadingPromise) 
        return this._scriptLoadingPromise;
      
      const script = this
        ._document
        .createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this.getSrc();
      
      this._scriptLoadingPromise = new Promise((resolve, reject) => {
        this._window['googleMapInit'] = () => {
          return resolve();
        }
        script.onerror = (error) => reject(error);
      })
      this
        ._document
        .head
        .appendChild(script);
      return this._scriptLoadingPromise;
    }
  
    getSrc() {
      const params = ['key', 'v', 'libraries', 'language', 'callback'];
      const keys = Object
        .keys(this.config)
        .filter(k => params.indexOf(k) !== -1)
        .filter(k => this.config[k] !== null)
        .map(k => ({key: k, value: this.config[k]}))
        .map(o => `${o.key}=${o.value}`)
        .join('&')
      return `http://maps.google.cn/maps/api/js?${keys}`
    }

    remoteJs() {
      const script = this
      ._document
      .createElement('script');
      script.type = "text/javascript";
      script.src =
        "http://developers.google.cn/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
        this
        ._document
        .head
        .appendChild(script);
      
    }

  }
  
  let instance = null;
  export const initGooglemap = (config) => {
    if (instance) 
      return;
    instance = new ggMapLoader(config);
    console.log(instance)
    instance.load();
    instance.remoteJs();
   
    
  }
  export {instance};
  