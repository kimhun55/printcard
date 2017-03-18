
var context
var camera = require("nativescript-camera");

var bghttp = require("nativescript-background-http");
var session = bghttp.session("image-upload");

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var dialogs = require("ui/dialogs");

var page
exports.onPageLoaded = (args) => {

    camera.requestPermissions();
    page = args.object;
    context = page.navigationContext;
    console.log("ok test 2")
    page.bindingContext = context.data
    if(context.image != null){
        var showpic = page.getViewById('pic');
        showpic.src = context.image._android||context.image._ios;
    }
}


exports.Onpic = ()=>{

    var options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: true };
camera.takePicture(options)   
    .then(function (imageAsset) {

        var showpic = page.getViewById('pic');
        showpic.src = imageAsset;

        context.image = imageAsset;
        
        var request = {
                url: "http://std-card.lbtech.ac.th/api_upload.php",
                //url:"http://webbass.bclbtech.com/long.php",
                //url : "http://192.168.8.109:3000/upload",
                method: "POST",
                // timeout: 5,
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": "bigpig.jpg",
                    //"x-code": moment().format("D_M_YYYY_H_s")
                    "x-code": context.data.student_id+".jpg"
                },
                description: "{ 'uploading': 'bigpig.jpg' }"
            };
            console.dump(request)
            
            var task = session.uploadFile(imageAsset.android || imageAsset.ios, request);
            
            task.on("progress", logEvent);
            task.on("error", logEvent);
            task.on("complete", logEvent);

       
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
}

function logEvent(e) {
    console.log(e.eventName);
  //  alert(e.eventName);
}
exports.goedit = ()=>{
    var navigationEntry = {
    moduleName: "view/edit/edit",
    context: { student: context.data, image:context.image},
    animated: true
};
topmost.navigate(navigationEntry);
}

exports.goback = ()=>{
    topmost.goBack();
}

exports.Onsave = ()=>{

    if(!context.image){
         dialogs.alert({
                title: "กรุณา",
                message: "กดที่รูปเพื่อถ่ายรูป",
                okButtonText: "รับทราบ"
            })
        return null;
    }

    var request = {
                url: "http://std-card.lbtech.ac.th/api_save.php",
                //url:"http://webbass.bclbtech.com/long.php",
                //url : "http://192.168.8.109:3000/upload",
                method: "POST",
                // timeout: 5,
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": "bigpig.jpg",
                    //"x-code": moment().format("D_M_YYYY_H_s")
                    "filename": context.data.student_id+".jpg",
                    "perfix_id":context.data.student_id,
                    "stu_fname":context.data.stu_fname,
                    "stu_lname":context.data.stu_lname,
                    "people_id":context.data.people_id

                },
                description: "{ 'uploading': 'bigpig.jpg' }"
            };
            console.dump(request)
            
            var task = session.uploadFile(context.image.android || context.image.ios, request);
            
            task.on("progress", logEvent);
            task.on("error", saveok);
            task.on("complete", saveerror)
    

}
function saveok(){
    dialogs.alert({
                title: "error save",
                message: "ติดต่อ ห้องศูนย์ ไม่สามรถ ติดต่อ server ได้",
                okButtonText: "รับทราบ"
            })
}
function saveerror(){
       dialogs.alert({
                title: "OK save",
                message: "เรียบร้อยแล้ว ติดต่อรับบัตรได้ที่ห้องศูนย์ข้อมูล",
                okButtonText: "รับทราบ"
            })
}

