import { useState, useEffect } from "react";

import {
  Input,
} from "components/molecules";
import { ReactComponent as EyeOpenSVG } from "assets/icons/eye-open-icon.svg";
import { ReactComponent as EditPencilSVG } from "assets/icons/edit-pencil-icon.svg";

import { useTitlePage, useForm } from "helpers/hooks";

import styles from "./styles.module.scss";
import { useHistory } from "react-router";
import { masterDataServices } from "services/fetch";

import Swal from 'sweetalert2'
import { storageKeys } from 'libs/keys';
import axios from 'axios'


const { root, form_root, button, navbar_root } = styles;

const DekstopLogin = () => {
  const [token, setToken] = useState('')
  const [match, setMatch] = useState(false)
  const { state, handleStateSchange } = useForm({
		email: "",
    // access: "Admin",
		password: "",
	});

  const [message, setMessage] = useState("")

  const [red1, setRed1] = useState(false)
  const [red2, setRed2] = useState(false)


  const history = useHistory();

  const getLocal = async () => {
    const myToken = await localStorage.getItem(storageKeys.token)
    await setToken(myToken)
  }

  const getData = async (token) => {
    try{
      const res = await axios.get('https://api-nginx-spm.accelego.id/api/v1/master-data/decode-token', {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      });
      const user = res?.data?.value?.user?.username
      console.log('ini ressssss',user);
      if(user !== '' && user !== null && user!== undefined){
        console.log('okkkk');
        setMatch(true)
        history.push("/user-management")
      }
    }catch(err){
      // console.log(err);
      setMatch(false)
    }
  }

  const decode = async () => {
    await getLocal()
    await getData(token)
  }

  useEffect(()=> {
    decode()
      // getLocal().then(()=>{
      //   getData(token)
      // })
  },[token, match])

  const postData = async () => {
    try {
      const response = await masterDataServices.login.post(state);
      const token = response?.value?.userToken
        // setMessage(response?.m)
        localStorage.setItem(storageKeys.token, token)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 2000,
          iconColor:'#1d3d3d',
          })
          // const get = localStorage.getItem(storageKeys.token)
          // console.log('local', get)
          // console.log(response?.value?.userToken)
        setTimeout(history.push("/user-management"),3000)	
    }catch (err) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login Failed',
        showConfirmButton: false,
        timer: 2000,
        iconColor:'#1d3d3d',
        })
		}
  }

  const handleSubmit = () => {
    if(state.email !== "" && state.password !== ""){
      setRed1(false)
      setRed2(false)
      postData()
    }else{
      if(state.email === ""){
        setRed1(true)
      }else{
        setRed1(false)
      }
      if(state.password === ""){
        setRed2(true)
      }else{
        setRed2(false)
      }
    }
}


  return (
    <div>
        <div className={navbar_root}>
            <h5>SPM Form</h5>
        </div>
    <div className={root}>
        <div className={form_root}>
            <h3>Selamat Datang!</h3>
            <h5>Silahkan  login untuk dapat mengakses platform</h5>
            <div style={{  }}>
            <Input
            type="text"
            value={state?.email}
            label="Email atau username"
            placeholder='Tuliskan email atau username'
            onChange={(e) =>
            handleStateSchange('email', e)
            }
            red={red1}
          />
          {/* <br/> */}
          <br/>
            <Input
                 type="password"
                label="Password"
                placeholder='Tuliskan password anda'
                value={state?.password}
                onChange={(e) =>
                  handleStateSchange('password', e)
                  }
                red={red2}
            />
            <div>
                <button className={button} onClick={()=> handleSubmit()}>Login</button>
            </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default DekstopLogin;