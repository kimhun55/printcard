var page
var stdModule = require("~/student-view-model");
var frameModule = require("ui/frame");
var observableModule = require("data/observable")
var dialogs = require("ui/dialogs");
var appSettings = require("application-settings");

let context = new observableModule.fromObject({
      user : "",
      pass : ""
})
exports.onPageLoaded = (args)=>{
    console.log("Page Loaded");
    var page = args.object;
    page.bindingContext = context;

    context.user = appSettings.getString("user");
    context.pass = appSettings.getString("pass");

}

exports.Onlogin = ()=>{
    appSettings.setString("user", context.user);
    appSettings.setString("pass", context.pass);
    
     fetch("http://std-card.lbtech.ac.th/api_login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user:context.user,pass:context.pass })
            }).then(r => { return r.json(); }).then(function (r) {
               // console.dump(r);
                // console.log(r.status)
                 if(r.status){
                     console.log("ok login");
                     context.data = r.data
                    // console.dump(context.data)
                    var topmost = frameModule.topmost();
                    topmost.navigate({
                    moduleName: "view/test2/test2", 
                    context: context,
                    });

                 }else{
                     console.log("error login")
                 }

            }).catch((error)=>{
                console.log('erro catch')
                console.dump(error);
            });


}

exports.goto2 = ()=>{
    var topmost = frameModule.topmost();
    var navigationEntry = {
    moduleName: "main-page",
    //clearHistory: true,
     //animated: true
};
topmost.navigate(navigationEntry);
}

let setting ={
    h:'',
    b:''
}
/*JSON.stringify => json to str*/
/*JSON.pares() => str to json*/
