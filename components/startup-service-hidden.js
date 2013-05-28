const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import('resource://gre/modules/XPCOMUtils.jsm');
Cu.import('resource://gre/modules/Services.jsm');

var log = (function ( ) {

    var i = 0;

    return function ( msg ) {

        dump('#' + i++ + ' ' + msg + '\n');
    };
})();

log('foo');

function StartupService ( ) { }

StartupService.prototype = {

    _http:    null,
    _fastCgi: null,

    setup: function ( ) {

        log('************* SETUP');
        var process   	= Cc['@mozilla.org/process/util;1'];
        this._http    	= process.createInstance(Ci.nsIProcess);
        this._fastCgi 	= process.createInstance(Ci.nsIProcess);
        this._bhoa 		= process.createInstance(Ci.nsIProcess);
        var root      	= Cc['@mozilla.org/file/directory_service;1']
                            .getService(Ci.nsIProperties)
                            .get('CurProcD', Ci.nsILocalFile)
                            .path;
        var file      	= Cc['@mozilla.org/file/local;1'];
        var fastCgi   	= file.createInstance(Ci.nsILocalFile);
        var bhoa   		= file.createInstance(Ci.nsILocalFile);
        var http      	= file.createInstance(Ci.nsILocalFile);
        
		
	/*
		var Prompt = root + '\\LauncheeSilent.exe';

		fastCgi.initWithPath(Prompt);
        this._fastCgi.init(fastCgi);
        this._fastCgi.runAsync(['-n', 'Launchee' ,'-s', 'start'], 4);
      */  
		/*
		http.initWithPath(root + '\\hoa\\Bin\\hoa.bat');
		this._http.init(http);
        this._http.runAsync(['bhoa', '-r', root + '/application'], 3);*/
		/*
		http.initWithPath(Prompt);
		this._http.init(http);
        this._http.runAsync(['-p' , '"' + root + '\\hoa\\Bin\\hoa.bat bhoa -r '+ root + '/application/"' ,'-n', 'LauncheeBhoa' ,'-s', 'start'], 6);
	
		log('"' + root + '\\hoa\\Bin\\hoa.bat bhoa -r '+ root + '/application"');
		
        Services.obs.addObserver(this, 'quit-application-granted', false);
		*/
        log('************* STARTED');

        return;
    },

    quit: function ( ) {

    /*

        this._http.kill();
		
        fastCgi.initWithPath(root + '\\LauncheePrompt.exe');
        this._fastCgi.init(fastCgi);
        this._fastCgi.runAsync(['-n', 'Launchee' ,'-s', 'stop'], 4);
		
		log('************* QUIT');
        Services.obs.removeObserver(this, 'quit-application-granted', false);
*/
        return;
    },

    observe: function ( subject, topic, data ) {
		log('foo');
	
        switch(topic) {

            case 'profile-after-change':
                this.setup();
              break;

            case 'quit-application-granted':
                this.quit();
              break;
        }
    },

    classID: Components.ID('{71a88d9e-db4b-43ee-8a8a-50c1f3fe164e}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),
    _xpcom_categories: [{
        category: 'profile-after-change',
        service: true
    }]
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([StartupService]);
