var config = {
    width: 960,
    height: 600,
    params: {
        enableDebugging: "0"
    }
};
config.params["disableContextMenu"] = true;
var u = new UnityObject2(config);

jQuery(function() {

    var $missingScreen = jQuery("#unityPlayer").find(".missing");
    var $brokenScreen = jQuery("#unityPlayer").find(".broken");
    $missingScreen.hide();
    $brokenScreen.hide();

    u.observeProgress(function(progress) {
        switch (progress.pluginStatus) {
            case "broken":
                $brokenScreen.find("a").click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $brokenScreen.show();
                break;
            case "missing":
                $missingScreen.find("a").click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $missingScreen.show();
                break;
            case "installed":
                $missingScreen.remove();
                break;
            case "first":
                break;
        }
    });
    // u.initPlugin(jQuery("#unityPlayer")[0], "lib/unity3d/aog1.unity3d"); // https://s3-us-west-2.amazonaws.com/teamrpc.aott/aog1.unity3d
    u.initPlugin(jQuery("#unityPlayer")[0], "https://s3-us-west-2.amazonaws.com/teamrpc.aott/aog1_01042015.unity3d");
});