import "./randomPassword.scss";
import { Container } from "../../containers";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const RandomPassword = () => {

    const [length, setLength] = useState(16);
    const [upperCaseChecked, setUpperCaseChecked] = useState(true);
    const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
    const [numberChecked, setNumberChecked] = useState(true);
    const [symbolChecked, setSymbolChecked] = useState(true);
    const [power, setPower] = useState("VERY STRONG");
    const [powerClass, setPowerClass] = useState("success");
    
    // Ref
    const passwordInputRef = useRef();
    const passwordRangeRef = useRef();

    // Charset
    let charset = "";
    const upperCaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const numberCharset = "0123456789";
    const symbolCharset = "!@#$%^&*";

    if(upperCaseChecked) {
        charset += upperCaseCharset;
    }

    if(lowerCaseChecked) {
        charset += lowerCaseCharset;
    }

    if(numberChecked) {
        charset += numberCharset;
    }

    if(symbolChecked) {
        charset += symbolCharset;
    }

    // Copy Password
    const copyPassword = () => {
        passwordInputRef.current.select();
        document.execCommand("copy");
        toast.success("Password Copied.");
    }

    // Generate Password
    let password = "";
    
    const generatePassword = () => {
    
        setLength(passwordRangeRef.current.value);


        if(length < 7) {
            setPower("VERY WEAK");
            setPowerClass("danger");
        }
        else if (length < 14) {
            setPower("GOOD");
            setPowerClass("warning");
        }
        else {
            setPower("VERY STRONG");
            setPowerClass("success");
        }

        for(let i = 0; i < length; i++) 
        {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
            passwordInputRef.current.value = password;
        }
    }

    useEffect(() => {
        generatePassword();
    }, [])


    return (
        <Container>
            <div className="app">

                <div className="app-header">
                    <h1 className="app-title">Random Password Generator</h1>
                    <p className="app-description">Secure and Strong Password</p>
                </div>

                <div className="app-body">
                    <input type="text" className="password-input" ref={passwordInputRef}/>
                    <span className={`password-power ${powerClass}`}>{power}</span>
                </div>

                <div className="password-length">
                    <input type="range" min="0" max="45" ref={passwordRangeRef} value={length} onChange={generatePassword}/>
                    <span className="password-length-text">{length}</span>
                </div>

                <div className="app-settings">
                
                    <div className="checkbox-group">
                        <input type="checkbox" checked={upperCaseChecked} onChange={(e) => {setUpperCaseChecked(e.target.checked)}}/>
                        <span>ABC</span>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" checked={lowerCaseChecked} onChange={(e) => {setLowerCaseChecked(e.target.checked)}}/>
                        <span>abc</span>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" checked={numberChecked} onChange={(e) => {setNumberChecked(e.target.checked)}}/>
                        <span>123</span>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" checked={symbolChecked} onChange={(e) => {setSymbolChecked(e.target.checked)}}/>
                        <span>#&%</span>
                    </div>

                </div>

                <div className="app-footer">
                    <button className="copy-button" onClick={copyPassword}>Copy Password</button>
                    <ToastContainer />
                </div>
            </div>
        </Container>
    )

}

export {RandomPassword};