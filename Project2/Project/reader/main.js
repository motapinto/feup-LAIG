//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){let a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}let a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(let g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){let b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){let d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{let e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrllets() {
    let lets = {};
    let parts = window.location.href.replace
    (
        /[?&]+([^=&]+)=([^&]*)/gi,    
        function(m,key,value) {
        lets[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    );

    return lets;
}

//Include additional files here
serialInclude(['../lib/CGF.js',
                'XMLscene.js',
                'MySceneGraph.js',
                'MyInterface.js',
                'Animation.js',
                'KeyframeAnimation.js',
                'primitives/MyRectangle.js',
                'primitives/MyTriangle.js',
                'primitives/MyCylinderOpt.js',
                'primitives/MySphere.js',
                'primitives/MyTorus.js',
                'primitives/nurbs/Plane.js',
                'primitives//nurbs/Patch.js',

main=function()
{
	// Standard application, scene and interface setup
    let app = new CGFapplication(document.body);
    let myInterface = new MyInterface();
    let myScene = new XMLscene(myInterface);

    app.init();
    app.setScene(myScene);
    app.setInterface(myInterface);
    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
    let filename=getUrllets()['file'] || "demo.xml";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	let myGraph = new MySceneGraph(filename, myScene);
	
	// start
    app.run();
}

]);