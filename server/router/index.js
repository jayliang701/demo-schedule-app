
function renderIndexPage(req, res, output, user) {
    output({ });
}

exports.getRouterMap = function() {
    return [
        { url: "/", view: "index", handle: renderIndexPage, needLogin:false },
        { url: "/index", view: "index", handle: renderIndexPage, needLogin:false }
    ];
}
