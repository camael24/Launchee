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

log('startup-services.js');

function StartupService ( ) { }

StartupService.prototype = {

    _http:    null,
    _fastCgi: null,

    setup: function ( ) {
        log('************* SETUP');
        var process   		= Cc['@mozilla.org/process/util;1'];
        this._http    		= process.createInstance(Ci.nsIProcess);
        this._http2    		= process.createInstance(Ci.nsIProcess);
        this._fastCgi 		= process.createInstance(Ci.nsIProcess);
        this._fastCgi2 		= process.createInstance(Ci.nsIProcess);
        var root      		= Cc['@mozilla.org/file/directory_service;1']
								.getService(Ci.nsIProperties)
								.get('CurProcD', Ci.nsILocalFile)
								.path;
        var file      		= Cc['@mozilla.org/file/local;1'];
        var fastCgi   		= file.createInstance(Ci.nsILocalFile);
        var fastCgi2   		= file.createInstance(Ci.nsILocalFile);
        var http      		= file.createInstance(Ci.nsILocalFile);
        var http2      		= file.createInstance(Ci.nsILocalFile);
		var Prompt 			= root + '\\LauncheeSilent.exe';
		var FastCgiParams 	= ['-n', 'Launchee' ,'-s', 'install' ];
		var FastCgiParam2 	= ['-n', 'Launchee' ,'-s', 'start' ];
		var hoaCore			= root + '\\hoa\\Hoa\\Core\\Bin\\hoa.bat';
		var bhoa			= hoaCore + ' http:bhoa -r ' + root + '/application';
		var bhoaParams 		= ['-p' , bhoa , '-n' , 'LauncheeBhoa' , '-s', 'install']
		var bhoaParams2 	= ['-p' , bhoa , '-n' , 'LauncheeBhoa' , '-s', 'start']
		
		log('Root : '+root);
		log('Prompt services: ' +Prompt); 
		
		fastCgi.initWithPath(Prompt);
        this._fastCgi.init(fastCgi);
        this._fastCgi.runAsync(FastCgiParams, FastCgiParams.length);
		log('Install FAST Cgi services');
	 
		fastCgi2.initWithPath(Prompt);
        this._fastCgi2.init(fastCgi2);
        this._fastCgi2.runAsync(FastCgiParam2, FastCgiParam2.length);
		log('Start FAST Cgi services');
		
		log('Bhoa : ' +bhoa);
		/*
		http.initWithPath(hoaCore);
		this._http.init(http);
        this._http.runAsync(bhoaParams, bhoaParams.length);
		*/
		
		http.initWithPath(Prompt);
		this._http.init(http);
        this._http.runAsync(bhoaParams , bhoaParams.length);
		log('Install Bhoa services');
		
		http2.initWithPath(Prompt);
		this._http2.init(http);
        this._http2.runAsync(bhoaParams2 , bhoaParams2.length);
		log('Start Bhoa services');
		
        //Services.obs.addObserver(this, 'quit-application-granted', false);
		
        log('************* STARTED');

        return;
    },

    quit: function ( ) {

    /*

        this._http.kill();
		
	var root      		= Cc['@mozilla.org/file/directory_service;1']
							.getService(Ci.nsIProperties)
							.get('CurProcD', Ci.nsILocalFile)
							.path;
	this._fastCgi 		= process.createInstance(Ci.nsIProcess);
	var fastCgi   		= file.createInstance(Ci.nsILocalFile);
	
	fastCgi.initWithPath(root + '\\LauncheePrompt.exe');
	this._fastCgi.init(fastCgi);
    this._fastCgi.runAsync(['-n', 'Launchee' ,'-s', 'stop'], 4);
	*/
	Services.obs.removeObserver(this, 'quit-application-granted', false);
	
	log('************* QUIT');
    

        return;
    },

    observe: function ( subject, topic, data ) {
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
