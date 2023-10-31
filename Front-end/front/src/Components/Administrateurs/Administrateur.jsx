import React from "react";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import NavBar from "../Navbar/Navbar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,} from "chart.js";
import { Doughnut, Bar} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,  BarElement,);

const Administrateur = () => {
    const token = Cookies.get('token');
    console.log(token);

    //jwt_decode pour décoder le token
    const decodedToken = jwt_decode(token);

    console.log(decodedToken.Roles);

    const data = {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
        datasets: [
          {
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2,4,5,20,1,2],
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
                    <h3>statistique des etudiants</h3>
                    <div className="chart-anatiny">
                        <Bar options={options} data={data} />
                    </div> 
                </div>
                <div className="dash-right">
                        <div className="anatiny"></div>
                        <div className="anatiny"></div>
                        <div className="anatiny"></div>
                        <div className="anatiny"></div>
                </div>
            </div>
        </div>
    )
}

export default Administrateur;