import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import {Line, Chart, CategoryScale, LinearScale, LogarithmicScale, Title } from 'chart.js';


const Administrateur = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      };
    return(
        <div className="content">
            <NavBar/>
            <div className="dashbord">
                <div className="dash-left">
                    {/* <Line data={data} options={options} /> */}
                </div>
                <div className="dash-right">
                    <div className="ambony">
                        <div className="gauche"></div>
                        <div className="droite"></div>
                        <div className="droite"></div>
                    </div>
                    <div className="ambany"></div>
                </div>
            </div>
        </div>
    )
}

export default Administrateur;