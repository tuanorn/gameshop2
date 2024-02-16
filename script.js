
const accounts = [];



var is_sidebar_tweening = false;
var request_type;
//index.html
var login_box = document.getElementById("login-box");
login_box.style.visibility = "hidden";
login_box.style.right = -login_box.offsetWidth - 5 + "px";

var login_label = document.getElementById("login-label");
var user = document.getElementById("user");
var pass = document.getElementById("password");
var user_display = document.getElementById("username-display");


//Displaying menu

//Tweening
function tweenSidebar(type, message, message2) {
    if (is_sidebar_tweening) {return;}
    is_sidebar_tweening = true;
    user.value = pass.value = hint.innerHTML = "";

    console.log(type + "\t" + request_type);

    if (type == request_type && !message2) {
        is_sidebar_tweening = false; return;}
    request_type = type;

    let margin = 5;
    let i = 0;

    if (message2 == "open") {login_box.style.visibility = "visible";}

    let interval1 = setInterval(function() {
        if (parseFloat(login_box.style.right) >= margin && message2 == "open") {
            is_sidebar_tweening = false;
            clearInterval(interval1); return;
        } else if (parseFloat(login_box.style.right) <= -login_box.offsetWidth - margin && message2 != "open") {
            is_sidebar_tweening = false;
            login_box.style.visibility = "hidden";
            if (type) {login_label.innerHTML = type.toUpperCase();}

            tweenSidebar(type, message, message); //recursion method - reopens the box once it's closed
            clearInterval(interval1); return;
        }
        login_box.style.right = (message2 == "open")?
            Math.min(login_box.offsetWidth*(-1*(i - 1)**4 + 1) - login_box.offsetWidth + margin, margin) + "px":
            Math.max(-login_box.offsetWidth*(-1*(i - 1)**4 + 1) - margin, -login_box.offsetWidth - margin) + "px";
        i += 0.01; 
        // Uses the equation y = -(x - 1)^4 + 1 to variably change the displacement (i acts as x)
        // i is changed with respect to time from 0 to 1
        // Duration of transition: 1/0.01*3 = 300 ms
    }, 3);

    return true;
}
//Uploading user's data
function request() {
    if (!user.value || user.value.replace(/ /g, "") == ""
    || !pass.value || pass.value.replace(/ /g, "") == "") {return;}

    let hint = document.getElementById("hint");

    function validateAccount() {
        let bool;
        for (a of accounts) {
            console.log(a.user + " " + a.pass);
            if (a.user == user.value) {
                bool = (a.user == user.value);
                if (a.pass == pass.value) {return 2;}
                break
            }
        }
        return bool? 1 : 0;
    } //returns 2 with matching username and password, 1 with only matching username, 0 if none matches the record
    function hideButtons() {
        user_display.innerHTML = user.value;
        let objects = document.querySelectorAll(".menu-item");
        console.log(objects);
        for (a of objects) {
            a.style.visibility = "hidden";
        } 
        tweenSidebar("close");
    }

    if (request_type == "signup") {
        console.log(validateAccount());
        if (validateAccount() == 0) {
            accounts.push({
                user: user.value,
                pass: pass.value,
            });
            hint.innerHTML = "Account created";
            hideButtons();
            user.value = pass.value = "";
        } else if (validateAccount() == 1) {
            hint.innerHTML = "Account name already exist";
        }        
    } else if (request_type == "login") {
        if (validateAccount() == 2) {
            console.log(validateAccount());
            hint.innerHTML = "Logged in";
            hideButtons();
            return;
        }
        hint.innerHTML = `<span style="color: var(--secondaryColor);">No account found in record</span>`;
        user.value = pass.value = "";
    }
}
//Redirecting to search results
function redirect(target) {
    console.log(target);
    if (target) {location.href = target + ".html";}
}


