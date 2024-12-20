// import { useState } from "react"
// import { BottomWarning } from "../components/BottomWarning"
// import { Button } from "../components/Button"
// import { Heading } from "../components/Heading"
// import { InputBox } from "../components/InputBox"
// import { SubHeading } from "../components/SubHeading"


// export const Signup=() => {
//     const [designatioon,setDesignation] = useState();
    
//     return <div className="bg-slate-300 h-screen flex justify-center">
//         <div className="flex flex-col justify-center">
//             <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//                 <Heading label={"Sign up"} />
//                 <SubHeading label={"Enter your information to create an account"} />
//                 <InputBox placeholder="Nimrat" label={"First Name"} />
//                 <InputBox placeholder="Kaur" label={"Last Name"} />
//                 <InputBox placeholder="xyz@gmail.com" label={"Email"} />
//                 <InputBox placeholder="123abc" label={"Password"} />
//                 <form class="max-w-sm text-start pt-2">
//                     <label for="countries" class="block mb-2 text-sm font-medium dark:text-white">Designation</label>
//                     <select id="countries" class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                         <option selected className="text-gray-400">Select Your Designation</option>
//                         <option value="US">University Official</option>
//                         <option value="IS">Inspector</option>
//                     </select>
//                 </form> 
//                 <div className="pt-4">
//                     <Button label={"Sign up"}to ={"/signup"}/>
//                 </div>
//                 <BottomWarning label={"Already have an account?"} buttonText={"Sign in"}to ={"/signin"}/>
//             </div>
//         </div>
//     </div>
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    const [designation, setDesignation] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (designation === "UN") {
            navigate("/university");
        } else if (designation === "IS") {
            navigate("/inspector");
        } else {
            alert("Please select a valid designation.");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox placeholder="Nimrat" label={"First Name"} />
                    <InputBox placeholder="Kaur" label={"Last Name"} />
                    <InputBox placeholder="xyz@gmail.com" label={"Email"} />
                    <InputBox placeholder="123abc" label={"Password"} />
                    <form className="max-w-sm text-start pt-2">
                        <label
                            htmlFor="designation"
                            className="block mb-2 text-sm font-medium dark:text-white"
                        >
                            Designation
                        </label>
                        <select
                            id="designation"
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        >
                            <option value="" className="text-gray-400">
                                Select Your Designation
                            </option>
                            <option value="UN">University Official</option>
                            <option value="IS">Inspector</option>
                        </select>
                    </form>
                    <div className="pt-4">
                        <Button onClick={handleSignup} label="SignUp">                     </Button>
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Sign in"}
                        to={"/signin"}
                    />
                </div>
            </div>
        </div>
    );
};