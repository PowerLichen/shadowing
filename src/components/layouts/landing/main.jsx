import React from "react";
import illustration from "../../../assets/Illustration.png"
import { MainTag } from "../../../styles/landing/main";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Main = () => {
    const { me } = useSelector(({ user }) => user);
    return (
        <MainTag>
            <div>
                <Link to="/">
                    <h1>
                        {
                            me ?
                                `Hello 🌼 ${me.nickname}`
                                :
                                "Shadowing"
                        }
                    </h1>
                </Link>
                {
                    !me &&
                    <Link to="/login">
                        <span>LogIn</span>
                    </Link>
                }
            </div>
            <img src={illustration} alt="illustration" />
            <h2>what is Shadowing?</h2>
            <p>
                Thank you for loving korea<br />
                if you use this app, <br />you can speak Korean fluently <br />
                JUST TRUST THIS APP ! 💕
            </p>
            {
                me ?
                    <Link to="/shadowing">
                        <button>Enjoy Shadowing</button>
                    </Link>
                    :
                    <Link to="/signup">
                        <button>Sign Up</button>
                    </Link>
            }

        </MainTag>
    )
};
export default Main;