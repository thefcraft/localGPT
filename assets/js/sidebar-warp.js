var sidebar = document.getElementsByClassName("sidebar")[0];
var div1 = document.getElementsByClassName("sidebar-warp-div1")[0];
var div2 = document.getElementsByClassName("sidebar-warp-div2")[0];
var toggle_settings_div = document.getElementsByClassName("toggle_settings")[0];

var isSidebarVisible = true;
var mouseOnSettings = false;

function sidebarWarp(element){
    if(isSidebarVisible){
        sidebar.style.display = "none";
        div1.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px; transform: rotate(-15deg); margin-bottom:-1px";
        div2.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px; transform: rotate(15deg); margin-top: -1px";
        isSidebarVisible = false;
    }else{
        sidebar.style.display = "flex";
        // sidebar.style.filter = "brightness(0.5)";
        div1.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px;";
        div2.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px;";
        isSidebarVisible = true;
    }
}
function sidebarWarpHover(element){
    if(isSidebarVisible){
        sidebar.style.filter = "brightness(0.5)";
        div1.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px; transform: rotate(15deg); margin-bottom:-1px";
        div2.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px; transform: rotate(-15deg); margin-top: -1px";
    }else{
        div1.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px; transform: rotate(-15deg); margin-bottom:-1px;";
        div2.style = "background-color: #ececf1; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px; transform: rotate(15deg); margin-top: -1px;";
    }
}
function sidebarWarpUnhover(element){
    if(isSidebarVisible){
        sidebar.style.filter = "none";
        div1.style = "background-color: #62636d; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px;";
        div2.style = "background-color: #62636d; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px;";
    }else{
        div1.style = "background-color: #62636d; width: 4px; height: 9px; border-radius: 2px 2px 0px 0px; transform: rotate(-15deg); margin-bottom:-1px;";
        div2.style = "background-color: #62636d; width: 4px; height: 9px; border-radius: 0px 0px 2px 2px; transform: rotate(15deg); margin-top: -1px;";
    }
}
function checkScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 1050) {
      sidebarWarp();
    }
  }
// window.addEventListener('resize', checkScreenWidth);
window.addEventListener('load', checkScreenWidth);




function toggle_settings(turnOn=true){
    if(turnOn){
        toggle_settings_div.style = "display: flex;";
    }else{
        toggle_settings_div.style = "display: none;";
    }
};  

function toggle_settings_onElseClick(t, setVar=null){
    if(setVar!=null){
        mouseOnSettings = setVar;
    }
    if(!mouseOnSettings && t){
        toggle_settings(false);
    }
};