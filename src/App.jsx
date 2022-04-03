import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Slider from "rc-slider";
import copy from "copy-to-clipboard";
import "animate.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import InputNumber from "react-input-number";

function Checkbox({ value, setValue }) {
  return (
    <div>
      <label className="relative flex justify-between items-center overflow-hidden">
        <input
          type="checkbox"
          className="sr-only peer"
          onClick={setValue}
          checked={value}
        />
        <span className="w-10 h-6 flex items-center flex-shrink-0 p-0.5 border-2 border-white duration-300 ease-in-out after:w-4 after:h-4 after:bg-white after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
      </label>
    </div>
  );
}

function App() {
  const [passwordLength, setPasswordLength] = useState(16);
  const [password, setPassword] = useState("");
  const [containLowercase, setContainLowercase] = useState(true);
  const [containUppercase, setContainUppercase] = useState(true);
  const [containNumber, setContainNumber] = useState(true);
  const [containSymbol, setContainSymbol] = useState(true);
  const [copied, setcopied] = useState(false);
  const generatePassword = () => {
    const lowercaseCharacters = "abcdefghijklmnopqrstuwxyz";
    const uppercaseCharacters = lowercaseCharacters.toLocaleUpperCase();
    const numberCharacters = "1234567890";
    const symbolCharacters = "!@#$%^&*(){}[]-=_+;:/?.>,<";

    let charactersCandidate = ''
    let newPassword = ''
    let lengthOfNewPassWord = passwordLength;
    if (lengthOfNewPassWord < 8) lengthOfNewPassWord = 8;
    if (lengthOfNewPassWord > 256) lengthOfNewPassWord = 256;

    for (let i = 0; i < lengthOfNewPassWord; i++) {
      if (containUppercase) charactersCandidate += uppercaseCharacters;
      if (containLowercase) charactersCandidate += lowercaseCharacters;
      if (containNumber) charactersCandidate += numberCharacters;
      if (containSymbol) charactersCandidate += symbolCharacters;
      const char = charactersCandidate.charAt(
        Math.floor(Math.random() * charactersCandidate.length)
      );
      newPassword += char;
      console.log(newPassword);
    }
    setPassword(newPassword);
  };
  useEffect(() => {
    generatePassword();
  }, [
    passwordLength,
    containLowercase,
    containUppercase,
    containNumber,
    containSymbol,
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-500 text-white p-5 lg:p-0 overflow-hidden">
      <h1 className=" text-3xl md:text-5xl animate__animated animate__flipInX">
        Password Generator
      </h1>
      <p className="text-center text-xl md:text-2xl max-w-2xl animate__animated animate__lightSpeedInLeft [animation-delay:1s]">
        Passwords are like underwear: you don't let people see it, you should
        change it very often and you shouldn't share it with strangers hehe
      </p>
      <p className="text-center text-2xl max-w-2xl animate__animated animate__lightSpeedInRight [animation-delay:1s]">
        (ﾉ･_-) ☆
      </p>
      <div className="flex flex-row border-2 justify-between border-white min-w-[10%] w-full md:max-w-[40%] p-4 mt-8 text-3xl whitespace-nowrap  animate__animated animate__bounceInUp [animation-delay:1.5s]">
        <div className="overflow-x-auto">
          <PerfectScrollbar>{password}</PerfectScrollbar>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => generatePassword()}>
            <Icon icon="ic:round-refresh" />
          </button>
          <button
            onClick={() => {
              copy(password);
              setcopied(true);
              setTimeout(() => {
                setcopied(false);
              }, 1000);
            }}
          >
            <Icon icon={copied ? "mdi:check" : "ic:round-content-copy"} />
          </button>
        </div>
      </div>
      <div className="w-4/5 mt-8 xl:w-2/5">
        <div className="flex flex-col lg:flex-row justify-between w-full lg:gap-10">
          <div className="flex flex-col items-start w-full lg:w-1/2">
            <div className="flex justify-between gap-2 items-center w-full animate__animated animate__fadeInLeft [animation-delay:2s] whitespace-nowrap">
              <label className="text-xl lg:text-2xl">Uppercase Character</label>
              <Checkbox
                setValue={() => setContainUppercase(!containUppercase)}
                value={containUppercase}
              />
            </div>
            <div className="flex justify-between gap-2 items-center  w-full animate__animated animate__fadeInRight [animation-delay:2s] whitespace-nowrap">
              <label className="text-xl lg:text-2xl">Lowercase Character</label>
              <Checkbox
                setValue={() => setContainLowercase(!containLowercase)}
                value={containLowercase}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full lg:w-1/2">
            <div className="flex justify-between gap-2 items-center  w-full animate__animated animate__fadeInLeft [animation-delay:2s] whitespace-nowrap">
              <label className="text-xl lg:text-2xl">Number</label>
              <Checkbox
                setValue={() => setContainNumber(!containNumber)}
                value={containNumber}
              />
            </div>
            <div className="flex justify-between gap-2 items-center  w-full animate__animated animate__fadeInRight [animation-delay:2s] whitespace-nowrap">
              <label className="text-xl lg:text-2xl">Symbol</label>
              <Checkbox
                setValue={() => setContainSymbol(!containSymbol)}
                value={containSymbol}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 text-2xl animate__animated animate__zoomInUp [animation-delay:2.5s]">
          <div className="flex flex-row">
            <span className="mr-2 whitespace-nowrap flex items-center gap-2 h-8">
              Password length:
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (passwordLength - 1 >= 8)
                      setPasswordLength(passwordLength - 1);
                  }}
                  className="-mt-[1px] w-4 h-4 flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  min={8}
                  max={256}
                  step={1}
                  value={passwordLength}
                  onChange={(e) => {
                    if (e.target.value.length <= 3) {
                      const number = parseInt(e.target.value);
                      if (!number) {
                        setPasswordLength(8);
                      } else {
                        setPasswordLength(number);
                      }
                    }
                  }}
                  className="bg-transparent w-12 text-center focus:outline-none focus:border-2 focus:border-white mt-0.5"
                />
                <button
                  onClick={() => {
                    if (passwordLength + 1 <= 256)
                      setPasswordLength(passwordLength + 1);
                  }}
                  className="-mt-[1px] w-4 h-4 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </span>
          </div>
          <div className="flex items-center gap-4">
            8
            <Slider
              className="h-1 w-full"
              onChange={(e) => setPasswordLength(e)}
              min={8}
              max={256}
              value={passwordLength}
            />
            256
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
