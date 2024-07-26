let err = document.querySelector(".error");
let err2 = document.querySelectorAll(".error")[1];
let correct = document.querySelector(".correct");
let correct2 = document.querySelectorAll(".correct")[1];

var inputs = document.querySelectorAll("input");
var newbie = 0;

var user1 = {
    name : "Alan",
    password : "AAAAAAAA0_",
    email : "alan@gmail.com"
}

var here = 0;

var users = [user1];

document.querySelectorAll("button")[0].addEventListener(
    "click", 
    ()=>
    {
        let errors = [];
        // let myname = inputs[0].value;
        let mymail = inputs[0].value;
        let mypass = inputs[1].value;

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mymail) || mymail=="")
        {
            correct.textContent = "";
            err.textContent = "Invalid Email";
            inputs[0].style.border = "0";
            inputs[1].style.border = "0";
            inputs[0].style.border = "1px solid red";
        }
        else 
        {
            if (mypass.length<8)
            {
                correct.textContent = "";
                err.textContent = "Password has to be more than 8 caracters";
                inputs[0].style.border = "0";
                inputs[1].style.border = "0";
                inputs[1].style.border = "1px solid red";
            }
            else if (!/[a-zA-Z]/.test(mypass))
            {
                correct.textContent = "";
                err.textContent = "password must content letters";
                inputs[0].style.border = "0";
                inputs[1].style.border = "0";
                inputs[1].style.border = "1px solid red";
            }
            else if (!/[0-9]/.test(mypass))
            {
                correct.textContent = "";
                err.textContent = "password must content numbers";
                inputs[0].style.border = "0";
                inputs[1].style.border = "0";
                inputs[1].style.border = "1px solid red";
            }
            else if (!/[_\-^]/.test(mypass))
            {
                correct.textContent = "";
                err.textContent = "password must content special caracter - ^ _";
                inputs[0].style.border = "0";
                inputs[1].style.border = "0";
                inputs[1].style.border = "1px solid red";
            }
            else if (mypass=="")
            {
                correct.textContent = "";
                err.textContent = "Enter a password";
                inputs[0].style.border = "0";
                inputs[1].style.border = "0";
                inputs[1].style.border = "1px solid red";
            }
            else
            {
                
                let new_user = {
                    email : mymail,
                    password : mypass
                }


                here = 0;
                users.forEach(
                    (user)=>
                    {
                        if (user.email == mymail)
                        {
                            here = 1;
                            if (user.password != mypass)
                            {
                                err.textContent = "Incorrect password";
                                correct.textContent = "";
                                inputs[0].style.border = "0";
                                inputs[1].style.border = "0";
                                inputs[1].style.border = "1px solid red";
                            }
                            else
                            {
                                err.textContent = "";
                                correct.textContent = "Welcome Mr/Mme "+user.name;
                                inputs[0].style.border = "0";
                                inputs[1].style.border = "0";
                            }
                        }
                    }
                )

                if (here==0)
                {
                    err.textContent = "Unknown user email";
                    correct.textContent = "";
                    inputs[0].style.border = "0";
                    inputs[1].style.border = "0";
                    inputs[0].style.border = "1px solid red";
                }

            }
        }
    }
)
function reset()
{
    document.querySelector(".left").style.animation = "";
}

document.querySelector(".sign_else").addEventListener(
    "click",
    () =>
    {
        document.querySelector(".left").style.animation = "turn 1.5s 1";
        value = setTimeout(reset, 1500);
        clearTimeout(reset, 1500);
        newbie = 1 - newbie;
        setTimeout(
            ()=>
            {
                document.querySelector(".log").style.display = "none";
                document.querySelector(".sign").style.display = "block";

                err.textContent = "";
                err2.textContent = "";
                correct.textContent = "";
                correct2.textContent = "";

                document.querySelectorAll("input").forEach(
                    (elt) =>
                    {
                        if (elt.type != "checkbox")
                        {
                            elt.value = "";
                        }
                    }
                );

            },
        500)
    }
)

document.querySelector(".log_else").addEventListener(
    "click",
    () =>
    {
        document.querySelector(".left").style.animation = "turn 1.5s 1";
        value = setTimeout(reset, 1500);
        newbie = 1 - newbie;
        setTimeout(
            ()=>
            {
                document.querySelector(".log").style.display = "block";
                document.querySelector(".sign").style.display = "none";
                err.textContent = "";
                err2.textContent = "";
                correct.textContent = "";
                correct2.textContent = "";

                document.querySelectorAll("input").forEach(
                    (elt) =>
                    {
                        if (elt.type != "checkbox")
                        {
                            elt.value = "";
                        }
                    }
                );
            },
        500)
    }
)



document.querySelectorAll("button")[1].addEventListener(
    "click", 
    ()=>
    {
        let myname = inputs[3].value;
        let mymail = inputs[4].value;
        let mypass = inputs[5].value;

        if (/\s/.test(myname) || myname=="")
        {
            correct2.textContent = "";
            err2.textContent = "Name must not have spaces";
            inputs[3].style.border = "0";
            inputs[4].style.border = "0";
            inputs[5].style.border = "0";
            inputs[3].style.border = "1px solid red";
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mymail) || mymail=="")
        {
            correct2.textContent = "";
            err2.textContent = "Invalid Email";
            inputs[3].style.border = "0";
            inputs[4].style.border = "0";
            inputs[5].style.border = "0";
            inputs[4].style.border = "1px solid red";
        }
        else 
        {
            if (mypass.length<8)
            {
                correct2.textContent = "";
                err2.textContent = "Password has to be more than 8 caracters";
                inputs[3].style.border = "0";
                inputs[4].style.border = "0";
                inputs[5].style.border = "0";
                inputs[5].style.border = "1px solid red";
            }
            else if (!/[a-zA-Z]/.test(mypass))
            {
                correct2.textContent = "";
                err2.textContent = "password must content letters";
                inputs[3].style.border = "0";
                inputs[4].style.border = "0";
                inputs[5].style.border = "0";
                inputs[5].style.border = "1px solid red";
            }
            else if (!/[0-9]/.test(mypass))
            {
                correct2.textContent = "";
                err2.textContent = "password must content numbers";
                inputs[3].style.border = "0";
                inputs[4].style.border = "0";
                inputs[5].style.border = "0";
                inputs[5].style.border = "1px solid red";
            }
            else if (!/[_\-^]/.test(mypass))
            {
                correct2.textContent = "";
                err2.textContent = "password must content special caracter - ^ _";
                inputs[3].style.border = "0";
                inputs[4].style.border = "0";
                inputs[5].style.border = "0";
                inputs[5].style.border = "1px solid red";
            }
            else if (mypass=="")
            {
                correct2.textContent = "";
                err2.textContent = "Enter a password";
                inputs[3].style.border = "0";
                inputs[4].style.border = "0";
                inputs[5].style.border = "0";
                inputs[5].style.border = "1px solid red";
            }
            else
            {
                let new_user = {
                    name : myname,
                    password : mypass,
                    email : mymail
                }


                here = 1;
                users.forEach(
                    (user)=>
                    {
                        if (user.name == myname)
                        {
                            correct2.textContent = "";
                            err2.textContent = "This name is already taken";
                            inputs[3].style.border = "0";
                            inputs[4].style.border = "0";
                            inputs[5].style.border = "0";
                            inputs[3].style.border = "1px solid red";
                            here = 0;
                        }
                        else if (user.email == mymail)
                        {
                            correct2.textContent = "";
                            err2.textContent = "This email is already linked to an account";
                            inputs[3].style.border = "0";
                            inputs[4].style.border = "0";
                            inputs[5].style.border = "0";
                            inputs[4].style.border = "1px solid red";
                            here = 0;
                        }
                    }
                )

                if (here == 1)
                {
                    users.push(new_user);
                    console.log(users);
                    err2.textContent = "";
                    correct2.textContent = "The new user was created";
                    inputs[3].style.border = "0";
                    inputs[4].style.border = "0";
                    inputs[5].style.border = "0";
                    inputs[5].style.border = "0";
                }
            }
        }
    }
)