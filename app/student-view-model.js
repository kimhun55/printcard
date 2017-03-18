var observable = require("data/observable");
var student = (function (_super) {
    __extends(student, _super);
    function student() {
        _super.call(this);
        this.set("idcard", "");
        this.set("id13", "");
        this.set("fname", "");
        this.set("lanme", "");
        this.set("group", "");
        this.set("dep", "");
        this.set("user","test");
        this.set("pass","test");
    }

    return student;
})(observable.Observable);
exports.student = student;
exports.mainViewModel = new student();