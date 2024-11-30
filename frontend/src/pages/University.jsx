import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const University=() => {
    
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                <Heading label={"University Official Details"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox placeholder="743298" label={"University ID"} />
                <InputBox placeholder="Graphic Era Hill University" label={"University Name"} />
                <InputBox placeholder="Nimrat Kaur" label={"Full Name"} />
                <InputBox placeholder="Rank" label={"Designation"} />
                <InputBox placeholder="xyz@gmail.com" label={" Official Email"} />
                <InputBox placeholder="91+____________" label={"Contact Number"} />
                <InputBox placeholder="nimratkaur123" label={"Username"} />
                <InputBox placeholder="12345" label={"Password"} />
                <div className="pt-4">
                <Button onClick="{verify}" label={"Verify & Signup"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"}to ={"/signin"}/>
            </div>
        </div>
    </div>
}