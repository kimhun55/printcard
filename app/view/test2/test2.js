
var context
var camera = require("nativescript-camera");
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
        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}
