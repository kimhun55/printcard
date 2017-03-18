var page
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

exports.onPageLoaded = (args) => {
    page = args.object;
    context = page.navigationContext;
    page.bindingContext = context.student
    if(context.image != null){
        var showpic = page.getViewById('pic');
        showpic.src = context.image._android||context.image._ios;
    }
   
}

exports.goback = ()=>{
    console.log('sdfsdf');
    topmost.goBack();
}
exports.Onedit =()=>{
    var navigationEntry = {
    moduleName: "view/test2/test2",
    context: { data: context.student, image:context.image},
    animated: true
};
topmost.navigate(navigationEntry);
}