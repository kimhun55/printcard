
var context
exports.onPageLoaded = (args) => {

    
    var page = args.object;
    context = page.navigationContext;
    console.log("ok test 2")
    console.dump(context)
    console.dump(page.navigationContext)
    page.bindingContext = context.data
}