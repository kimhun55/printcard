
var context
var camera = require("nativescript-camera");

var bghttp = require("nativescript-background-http");
 
var session = bghttp.session("image-upload");

exports.onPageLoaded = (args) => {

    camera.requestPermissions();
    var page = args.object;
    context = page.navigationContext;
    console.log("ok test 2")
    console.dump(context)
    console.dump(page.navigationContext)
    page.bindingContext = context.data
}


exports.Onpic = ()=>{

    var options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
camera.takePicture(options)   
    .then(function (imageAsset) {

        var showpic = page.getViewById('pic');
        showpic.src = imageAsset;
        /*
        var request = {
                url: "http://192.168.8.171:3000/upload",
                //url:"http://webbass.bclbtech.com/long.php",
                method: "POST",
                // timeout: 5,
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": "bigpig.jpg",
                    //"x-code": moment().format("D_M_YYYY_H_s")
                    "x-code": "testtest33"
                },
                description: "{ 'uploading': 'bigpig.jpg' }"
            };
            
            var task = session.uploadFile(imageAsset.android || imageAsset.ios, request);
            
            task.on("progress", logEvent);
            task.on("error", logEvent);
            task.on("complete", logEvent);*/

        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
